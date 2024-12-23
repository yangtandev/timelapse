const SPAWN = require('child_process').spawn;
const FORK = require('child_process').fork;
const HTTP = require('http');
const FS = require('fs-extra');
const EXPRESS = require('express');
const CORS = require('cors');
const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);
const PORT = 4000;
const PM2_Path = process.env.NVM_BIN + '/pm2';
const TIME_LAPSE_PATH = `./ZLMediaKit/release/linux/Debug/www/time-lapse`;
const CONFIG_PATH = `./ZLMediaKit/release/linux/Debug/www/config/config.json`;
const FFMPEG = require('fluent-ffmpeg');
FFMPEG.setFfmpegPath(`./ffmpeg/ffmpeg`);
const IMAGE_COMMANDS = {};
let CONFIG = {};
let INTERVAL_PROCESS;

/*
    Convert the original RTSP stream to a format acceptable.
*/
async function RTSPToImage(rtsp) {
	const ip = rtsp.split('@').pop();
	const id = ip.match(/\d+/g).join('');
	const input = `rtsp://localhost:9554/live/${ip}`;
	const now = new Date(
		new Date().getTime() - new Date().getTimezoneOffset() * 60000
	);
	const today = now.toISOString().slice(0, 10);
	const fileName = now.toISOString().slice(0, -5).split('T').join(' ');
	let output = TIME_LAPSE_PATH;

	for (let path of ['backup', 'image', ip, today]) {
		output += `/${path}`;
		if (!FS.existsSync(output)) {
			FS.mkdirSync(output);
		}
	}

	output += `/${fileName}.jpg`;

	if (IMAGE_COMMANDS.hasOwnProperty(id)) {
		IMAGE_COMMANDS[id].kill('SIGINT');
	}

	IMAGE_COMMANDS[id] = FFMPEG(input);
	IMAGE_COMMANDS[id]
		.addInputOption('-rtsp_transport', 'tcp', '-re', '-y')
		.addOutputOption('-vframes', 1)
		.on('stderr', function (err) {})
		.on('error', function (err, stdout, stderr) {})
		.on('end', async function () {
			FS.stat(output, (error, stats) => {
				if (error) {
					console.log(error);
				} else if (stats.isFile() && stats.size == 0) {
					FS.remove(output);
				}
			});
		})
		.save(output);
}

/*
    Copy all frames to collection.
*/
function ImageToCollection(rtsp) {
	const ip = rtsp.split('@').pop();
	const imagePath = `${TIME_LAPSE_PATH}/backup/image/${ip}`;

	if (!FS.existsSync(`${imagePath}/collection`)) {
		FS.mkdirSync(`${imagePath}/collection`);
	}

	FS.readdir(imagePath, (err, dateList) => {
		if (err) console.log(err);
		dateList = dateList.filter((date) => date !== 'collection');
		for (const date of dateList) {
			FS.copy(`${imagePath}/${date}`, `${imagePath}/collection`, {
				overwrite: true,
			});
		}
	});
}

/*
    Periodically clear backups that are one month overdue.
*/
function clearExpiredBackup(rtsp) {
	const ip = rtsp.split('@').pop();
	const today = new Date().toISOString().slice(0, 10);

	FS.readdir(`${TIME_LAPSE_PATH}/backup/image/${ip}`, (err, dateList) => {
		dateList = dateList.filter((date) => date !== 'collection');
		dateList.forEach((date) => {
			const diffTime = Math.abs(new Date(today) - new Date(date));
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			if (diffDays >= CONFIG.retentionDays) {
				FS.rmdirSync(`${TIME_LAPSE_PATH}/backup/image/${ip}/${date}`, {
					recursive: true,
					force: true,
				});
			}
		});
	});
}

/*
    Set rtsp list related variables.
*/
function setRtspList() {
	const source = JSON.parse(FS.readFileSync(CONFIG_PATH, 'utf8'));
	CONFIG = JSON.parse(JSON.stringify(source));

	if (CONFIG.timelapseClientList.length > 0) {
		CONFIG.allRtspList = CONFIG.timelapseClientList
			.map((clinet) => clinet.rtspList)
			.reduce((prev, curr) => prev.concat(curr));
	} else {
		CONFIG.allRtspList = [];
	}
}

function getInterval() {
	return setInterval(
		(function runProcesses() {
			setRtspList();

			if (CONFIG.allRtspList.length > 0) {
				CONFIG.allRtspList.forEach((rtsp) => {
					RTSPToImage(rtsp);
				});
			}

			// If you need to automatically clear the backup, please uncomment the following code.
			// if (CONFIG.allRtspList.length > 0) {
			// 	CONFIG.allRtspList.forEach((rtsp) => {
			// 		clearExpiredBackup(rtsp);
			// 	});
			// }

			return runProcesses;
		})(),
		1000 * CONFIG.screenshotFrequencyInSeconds
	);
}

APP.use(CORS());
APP.use(EXPRESS.json());
APP.use(EXPRESS.static(__dirname));

APP.get('/generateTimeLapse', (req, res) => {
	try {
		FORK('./generate-time-lapse.js');

		res.send('success');
	} catch (err) {
		res.send(err.message);
		return;
	}
});

APP.get('/forceReloadSystem', (req, res) => {
	try {
		// Force reload main process.
		SPAWN(`${PM2_Path} reload mediaserver --force`, { shell: true });

		res.send('success');
	} catch (err) {
		res.send(err.message);
		return;
	}
});

APP.post('/updateConfig', (req, res) => {
	const { data } = req.body;
	try {
		JSON.parse(data);

		FS.writeFile(CONFIG_PATH, data, (err) => {
			if (err) throw err;

			setRtspList();
			clearInterval(INTERVAL_PROCESS);
			INTERVAL_PROCESS = getInterval();
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
SERVER.listen(PORT, () => {
	console.log(`http://localhost:9080/time-lapse/backup/video`);

	setTimeout(() => {
		INTERVAL_PROCESS = getInterval();

		setInterval(
			(function runProcesses() {
				setRtspList();

				if (CONFIG.allRtspList.length > 0) {
					for (const rtsp of CONFIG.allRtspList) {
						ImageToCollection(rtsp);
					}
				}
				return runProcesses;
			})(),
			3600000
		);
	}, 10000);
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

	// Terminate all zombie processes.
	const killZombieProcesses = SPAWN(
		`ps -Al | grep -w Z | awk '{print $4}' | xargs sudo kill -9`,
		{
			shell: true,
		}
	);
});

module.exports = {
	RTSPToImage,
};
