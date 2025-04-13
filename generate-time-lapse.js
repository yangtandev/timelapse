const FS = require('fs-extra');
const TIME_LAPSE_PATH = `./ZLMediaKit/release/linux/Debug/www/time-lapse`;
const CONFIG_PATH = `./ZLMediaKit/release/linux/Debug/www/config/config.json`;
const FFMPEG = require('fluent-ffmpeg');
FFMPEG.setFfmpegPath(`./ffmpeg/ffmpeg`);
const COLLECTION_COMMANDS = {};
let CONFIG = {};

/*
    Make a time-lapse film of all the photos in the collection.
*/
function generateTimeLapse(rtsp) {
	const ip = rtsp.split('@').pop();
	const id = ip.match(/\d+/g).join('');
	const imagePath = `${TIME_LAPSE_PATH}/backup/image/${ip}`;
	let videoPath = `${TIME_LAPSE_PATH}/backup`;

	for (let path of ['video', ip, 'collection']) {
		videoPath += `/${path}`;
		if (!FS.existsSync(videoPath)) {
			FS.mkdirSync(videoPath);
		}
	}

	const input = `${imagePath}/collection/*.jpg`;
	const converting = `${videoPath}/converting... please wait.mp4`;
	const output = `${videoPath}/${id}.mp4`;
	const framesPerSecond = CONFIG.framesPerSecond;

	if (COLLECTION_COMMANDS.hasOwnProperty(id)) {
		try {
			COLLECTION_COMMANDS[id].kill('SIGINT');
			delete COLLECTION_COMMANDS[id];
		} catch (e) {
			console.warn(`Failed to kill ffmpeg for ${id}`, e.message);
		}
	}

	COLLECTION_COMMANDS[id] = FFMPEG(input);
	COLLECTION_COMMANDS[id]
		.addInputOption('-r', framesPerSecond, '-pattern_type', 'glob')
		.addOutputOption('-s', 'hd1080', '-shortest', '-b:v', '2M')
		.videoCodec('h264_nvenc')
		.on('stderr', function (err) {})
		.on('error', function (err, stdout, stderr) {
			console.log(err);
		})
		.on('end', function (err, stdout, stderr) {
			FS.move(converting, output, { overwrite: true }, (err) => {
				if (err) return console.error(err);
			});
		})
		.save(converting);
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

/*
    Run all necessary processes.
*/
(() => {
	console.log(`Starting to generate timelapse, please wait...`);
	setRtspList();

	if (CONFIG.allRtspList.length > 0) {
		for (const rtsp of CONFIG.allRtspList) {
			generateTimeLapse(rtsp);
		}
	}
})();
