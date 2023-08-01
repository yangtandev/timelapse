/* 
    Express.js & Node.js
*/
const { spawn } = require('child_process');
const http = require('http');
// const https = require('https')
const fs = require('fs-extra');
// const options = {
//     key: fs.readFileSync(`/etc/letsencrypt/live/stream.ginibio.com/privkey.pem`, 'utf8'),
//     cert: fs.readFileSync(`/etc/letsencrypt/live/stream.ginibio.com/fullchain.pem`, 'utf8'),
// }
const express = require('express');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
// const server = https.createServer(options, app)
const port = 3000;

/* 
    Variables
*/
const config = {};
const imageCommands = {};
const videoCommands = {};
const collectionCommands = {};

/*
    Paths
*/
const pm2Path = `$HOME/.nvm/versions/node/v14.16.1/bin/pm2`;
const sslPath = './certificates/ssl.pem';
const mediaServerPath = './ZLMediaKit/release/linux/Debug/MediaServer';
const backupPath = `./ZLMediaKit/release/linux/Debug/www/backup`;
const clientListPath = `./ZLMediaKit/release/linux/Debug/www/client-list/client-list.json`;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(`/usr/bin/ffmpeg`);

/*
    Convert the original RTSP stream to a format acceptable to Media Server.
*/
function RTSPToImage(rtsp) {
	const ip = rtsp.split('@').pop();
	const id = ip.match(/\d+/g);
	const now = new Date(
		new Date().getTime() - new Date().getTimezoneOffset() * 60000
	);
	const today = now.toISOString().slice(0, 10);
	const fileName = now.toISOString().slice(0, -5).split('T').join(' ');
	let output = backupPath;

	for (let path of ['', 'image', ip, today]) {
		output += `/${path}`;
		if (!fs.existsSync(output)) {
			fs.mkdirSync(output);
		}
	}

	output += `/${fileName}.jpg`;

	if (imageCommands.hasOwnProperty(id)) {
		imageCommands[id].kill('SIGINT');
	}

	imageCommands[id] = ffmpeg(rtsp);
	imageCommands[id]
		.addInputOption('-rtsp_transport', 'tcp', '-re', '-y')
		.addOutputOption('-vframes', 1)
		.on('stderr', function (err) {})
		.on('error', function (err, stdout, stderr) {})
		.on('end', function (err, stdout, stderr) {})
		.save(output);
}

/*
    Convert all frames at the specified position into a time-lapse video.
*/
function ImageToVideo(rtsp, speed = 1) {
	const ip = rtsp.split('@').pop();
	const id = ip.match(/\d+/g);
	const now = new Date(
		new Date().getTime() - new Date().getTimezoneOffset() * 60000
	);
	const today = now.toISOString().slice(0, 10);
	const fileName = now.toISOString().slice(0, -5).split('T').join(' ');
	const framesPerSecond = 60 * speed;
	let imagePath = `${backupPath}/image/${ip}/${today}/*.jpg`;
	let videoPath = `${backupPath}`;

	for (let path of ['video', ip, today]) {
		videoPath += `/${path}`;
		if (!fs.existsSync(videoPath)) {
			fs.mkdirSync(videoPath);
		}
	}

	videoPath += `/${fileName}.mp4`;

	if (videoCommands.hasOwnProperty(id)) {
		videoCommands[id].kill('SIGINT');
	}

	videoCommands[id] = ffmpeg(imagePath);
	videoCommands[id]
		.addInputOption('-r', framesPerSecond, '-pattern_type', 'glob')
		.addOutputOption('-s', 'hd1080')
		.videoCodec('libx264')
		.on('stderr', function (err) {})
		.on('error', function (err, stdout, stderr) {})
		.on('end', function (err, stdout, stderr) {})
		.save(videoPath);
}

/*
    Convert all frames from all positions into a time-lapse video.
*/
function ImageToCollection(rtsp, speed = 10) {
	const ip = rtsp.split('@').pop();
	const id = ip.match(/\d+/g);
	const imagePath = `${backupPath}/image/${ip}`;
	const videoPath = `${backupPath}/video/${ip}`;

	if (!fs.existsSync(`${imagePath}/collection`)) {
		fs.mkdirSync(`${imagePath}/collection`);
	}
	if (!fs.existsSync(`${videoPath}/collection`)) {
		fs.mkdirSync(`${videoPath}/collection`);
	}

	fs.readdir(imagePath, (err, dateList) => {
		if (err) throw err;
		dateList = dateList.filter((date) => date !== 'collection');
		dateList.forEach((date) => {
			fs.copySync(`${imagePath}/${date}`, `${imagePath}/collection`, {
				overwrite: true,
			});
		});
	});

	const input = `${imagePath}/collection/*.jpg`;
	const output = `${videoPath}/collection/collection.mp4`;
	const framesPerSecond = 60 * speed;

	if (collectionCommands.hasOwnProperty(id)) {
		collectionCommands[id].kill('SIGINT');
	}

	collectionCommands[id] = ffmpeg(input);
	collectionCommands[id]
		.addInputOption('-r', framesPerSecond, '-pattern_type', 'glob')
		.addOutputOption('-s', 'hd1080')
		.videoCodec('libx264')
		.on('stderr', function (err) {})
		.on('error', function (err, stdout, stderr) {})
		.on('end', function (err, stdout, stderr) {
			fs.rmdirSync(`${backupPath}/image/${ip}/collection`, {
				recursive: true,
				force: true,
			});
		})
		.save(output);
}

/*
    Periodically clear backups that are one month overdue.
*/
function clearExpiredBackup(rtsp) {
	const ip = rtsp.split('@').pop();
	const today = new Date().toISOString().slice(0, 10);

	['image'].forEach((path) => {
		// ['image', 'video'].forEach((path) => {
		fs.readdir(`${backupPath}/${path}/${ip}`, (err, dateList) => {
			dateList = dateList.filter((date) => date !== 'collection');
			dateList.forEach((date) => {
				const diffTime = Math.abs(new Date(today) - new Date(date));
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

				if (diffDays > 30) {
					fs.rmdirSync(`${backupPath}/${path}/${ip}/${date}`, {
						recursive: true,
						force: true,
					});
				}
			});
		});
	});

	// fs.readdir(`${backupPath}/video/${ip}/${today}`, (err, filenameList) => {
	// 	if (err) throw err;

	// 	filenameList.pop();

	// 	if (filenameList.length > 0) {
	// 		filenameList.forEach((filename) => {
	// 			fs.rmSync(`${backupPath}/video/${ip}/${today}/${filename}`, {
	// 				recursive: true,
	// 				force: true,
	// 			});
	// 		});
	// 	}
	// });
}

/*
    Set rtsp list related variables.
*/
function setRtspList() {
	const source = JSON.parse(fs.readFileSync(clientListPath, 'utf8'));
	config.clientList = source.clientList;

	if (config.clientList.length > 0) {
		config.allRtspList = config.clientList
			.map((clinet) => clinet.rtspList)
			.reduce((prev, curr) => prev.concat(curr));
	} else {
		config.allRtspList = [];
	}
}

/* 
    Run media server。
*/
function runMediaServer() {
	const mediaServer = spawn(`${mediaServerPath} -s ${sslPath}`, {
		shell: true,
	});

	mediaServer.stdout.on('data', async (rawData) => {
		rawData = `${rawData}`;

		if (
			rawData.includes('end of file') ||
			rawData.includes('pusher session timeout') ||
			rawData.includes('no such stream')
		) {
			const filteredData = rawData
				.split(' ')
				.find(
					(str) =>
						str.includes('__defaultVhost__') &&
						(str.includes('RTSP') ||
							str.includes('rtsp') ||
							str.includes('rtmp'))
				);

			if (filteredData) {
				const rtsp = config.allRtspList
					.filter(
						(rtsp) =>
							rtsp.split('@').pop().match(/\d/g).join('') ==
							filteredData.match(/\d/g).join('')
					)
					.join(' ');
				const ip = rtsp.split('@').pop();

				// RTSP reconnection mechanism.
				if (config.allRtspList.length > 0) {
					config.allRtspList.forEach((rtsp) => {
						RTSPToImage(rtsp);
					});
				}
			}
		}
	});
}

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/updateClientList', cors('http://localhost:9080'), (req, res) => {
	const { data } = req.body;
	try {
		JSON.parse(data);

		fs.writeFile(clientListPath, data, (err) => {
			if (err) throw err;

			setRtspList();
			runMediaServer();
		});

		res.send('success');
	} catch (err) {
		res.send(err.message);
		return;
	}
});

/*
    Run all necessary processes.
*/
server.listen(port, () => {
	console.log(`http://localhost:9080/backup/video`);

	setRtspList();
	runMediaServer();
	setInterval(
		(function runProcesses() {
			if (config.allRtspList.length > 0) {
				config.allRtspList.forEach((rtsp) => {
					RTSPToImage(rtsp);
					// ImageToVideo(rtsp);
					clearExpiredBackup(rtsp);
				});
			}

			return runProcesses;
		})(),
		1000 * 60
	);
	setInterval(() => {
		if (config.allRtspList.length > 0) {
			config.allRtspList.forEach((rtsp) => {
				ImageToCollection(rtsp);
			});
		}
	}, 1000 * 60 * 30);
});

/* 
    When the program terminates, clear the related background programs.
*/
process.on('SIGINT', (code) => {
	String('SIGINT')
		.split('')
		.forEach((word) => {
			const slashes = String('|').repeat(30);
			console.log(`${slashes} ${word} ${slashes}`);
		});

	// Terminate all processes related to ffmpeg and media server.
	const killProcesses = spawn('killall -9 ffmpeg MediaServer', {
		shell: true,
	});

	killProcesses.on('close', (code) => {
		// Terminate all zombie processes.
		const killZombieProcesses = spawn(
			`ps -Al | grep -w Z | awk '{print $4}' | xargs sudo kill -9`,
			{
				shell: true,
			}
		);

		killZombieProcesses.on('close', (code) => {
			// setRtspList()
			// runMediaServer()
		});
	});
});
