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
			FS.mkdirSync(videoPath, { recursive: true });
		}
	}

	const input = `${imagePath}/collection/*.jpg`;
	const converting = `${videoPath}/converting... please wait.mp4`;
	const output = `${videoPath}/${id}.mp4`;
	const framesPerSecond = CONFIG.framesPerSecond;

	if (COLLECTION_COMMANDS.hasOwnProperty(id)) {
		console.log(`[INFO] Time-lapse generation for ${id} is already running.`);
		return;
	}

	const command = FFMPEG(input)
		.addInputOption('-r', framesPerSecond, '-pattern_type', 'glob')
		.addOutputOption('-s', 'hd1080', '-shortest', '-b:v', '2M')
		.videoCodec('h264_nvenc')
		.on('start', function (cmd) {
			console.log(`[INFO] Started time-lapse generation for ${id}: ${cmd}`);
		})
		.on('error', function (err, stdout, stderr) {
			console.error(`[ERROR] Time-lapse generation for ${id} failed:`, err.message);
			delete COLLECTION_COMMANDS[id];
			// Clean up temp file on error
			FS.unlink(converting, () => {});
		})
		.on('end', function () {
			console.log(`[INFO] Time-lapse generation for ${id} finished successfully.`);
			delete COLLECTION_COMMANDS[id];
			FS.move(converting, output, { overwrite: true }, (err) => {
				if (err) return console.error(`[ERROR] Failed to move video for ${id}:`, err);
				console.log(`[INFO] Successfully created time-lapse video for ${id} at ${output}`);
			});
		})
		.save(converting);

	COLLECTION_COMMANDS[id] = command;
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

function cleanupAndExit() {
    console.log('Received exit signal. Cleaning up all running ffmpeg processes...');
    const running_processes = Object.keys(COLLECTION_COMMANDS);
    if (running_processes.length === 0) {
        console.log('No ffmpeg processes to kill.');
        process.exit(0);
    }

    running_processes.forEach(id => {
        console.log(`Killing ffmpeg process for ${id}...`);
        COLLECTION_COMMANDS[id].kill('SIGKILL'); // Force kill
        delete COLLECTION_COMMANDS[id];
    });

    // Give a moment for processes to be killed before exiting
    setTimeout(() => process.exit(0), 100);
}

process.on('SIGINT', cleanupAndExit);
process.on('SIGTERM', cleanupAndExit);
