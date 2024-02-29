const SPAWN = require("child_process").spawn;
const HTTP = require("http");
const HTTPS = require("https");
const FS = require("fs-extra");
const EXPRESS = require("express");
const CORS = require("cors");
const APP = EXPRESS();
const DOMAIN_NAME = "stream.ginibio.com"; // Replace it with your registered domain name.
const IS_HTTPS = false; // If you need to use HTTPS, please change it to true
const SERVER = IS_HTTPS
    ? HTTPS.createServer(
          {
              key: FS.readFileSync(
                  `/etc/letsencrypt/live/${DOMAIN_NAME}/privkey.pem`,
                  "utf8"
              ),
              cert: FS.readFileSync(
                  `/etc/letsencrypt/live/${DOMAIN_NAME}/fullchain.pem`,
                  "utf8"
              ),
          },
          APP
      )
    : HTTP.createServer(APP);
const PORT = 4000;
const PM2_Path = `$HOME/.nvm/versions/node/v14.16.1/bin/pm2`;
const TIME_LAPSE_PATH = `./ZLMediaKit/release/linux/Debug/www/time-lapse`;
const CONFIG_PATH = `./ZLMediaKit/release/linux/Debug/www/config/config.json`;
const FFMPEG = require("fluent-ffmpeg");
FFMPEG.setFfmpegPath(`./ffmpeg/ffmpeg`);
const IMAGE_COMMANDS = {};
const VIDEO_COMMANDS = {};
const COLLECTION_COMMANDS = {};
let CONFIG = {};
let INTERVAL_PROCESS;

/*
    Convert the original RTSP stream to a format acceptable.
*/
async function RTSPToImage(rtsp) {
    const ip = rtsp.split("@").pop();
    const id = ip.match(/\d+/g).join('');
    const input = `rtsp://localhost:9554/live/${ip}`;
    const now = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
    );
    const today = now.toISOString().slice(0, 10);
    const fileName = now.toISOString().slice(0, -5).split("T").join(" ");
    let output = TIME_LAPSE_PATH;

    for (let path of ["", "backup", "image", ip, today]) {
        output += `/${path}`;
        if (!FS.existsSync(output)) {
            FS.mkdirSync(output);
        }
    }

    output += `/${fileName}.jpg`;

    if (IMAGE_COMMANDS.hasOwnProperty(id)) {
        IMAGE_COMMANDS[id].kill("SIGINT");
    }

    IMAGE_COMMANDS[id] = FFMPEG(input);
    IMAGE_COMMANDS[id]
        .addInputOption("-rtsp_transport", "tcp", "-re", "-y")
        .addOutputOption("-vframes", 1)
        .on("stderr", function (err) {})
        .on("error", function (err, stdout, stderr) {})
        .on("end", async function () {
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
    Convert all frames at the specified position into a time-lapse video.
*/
function ImageToVideo(rtsp) {
    const ip = rtsp.split("@").pop();
    const id = ip.match(/\d+/g).join('');
    const now = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
    );
    const today = now.toISOString().slice(0, 10);
    const fileName = now.toISOString().slice(0, -5).split("T").join(" ");
    const framesPerSecond = framesPerSecond;
    let imagePath = `${TIME_LAPSE_PATH}/backup/image/${ip}/${today}/*.jpg`;
    let videoPath = `${TIME_LAPSE_PATH}/backup`;

    for (let path of ["video", ip, today]) {
        videoPath += `/${path}`;
        if (!FS.existsSync(videoPath)) {
            FS.mkdirSync(videoPath);
        }
    }

    videoPath += `/${fileName}.mp4`;

    if (VIDEO_COMMANDS.hasOwnProperty(id)) {
        VIDEO_COMMANDS[id].kill("SIGINT");
    }

    VIDEO_COMMANDS[id] = FFMPEG(imagePath);
    VIDEO_COMMANDS[id]
        .addInputOption("-r", framesPerSecond, "-pattern_type", "glob")
        .addOutputOption("-s", "hd1080")
        .videoCodec("libx264")
        .on("stderr", function (err) {})
        .on("error", function (err, stdout, stderr) {})
        .on("end", function (err, stdout, stderr) {})
        .save(videoPath);
}

/*
    Copy all frames to collection.
*/
function ImageToCollection(rtsp) {
    const ip = rtsp.split("@").pop();
    const imagePath = `${TIME_LAPSE_PATH}/backup/image/${ip}`;

    if (!FS.existsSync(`${imagePath}/collection`)) {
        FS.mkdirSync(`${imagePath}/collection`);
    }

    FS.readdir(imagePath, (err, dateList) => {
        if (err) console.log(err);
        dateList = dateList.filter((date) => date !== "collection");
        dateList.forEach((date) => {
            FS.copy(`${imagePath}/${date}`, `${imagePath}/collection`, {
                overwrite: true,
            });
        });
    });
}

/*
    Make a time-lapse film of all the photos in the collection.
*/
function generateTimeLapse(rtsp) {
    const ip = rtsp.split("@").pop();
    const id = ip.match(/\d+/g).join('');
    const imagePath = `${TIME_LAPSE_PATH}/backup/image/${ip}`;
    let videoPath = `${TIME_LAPSE_PATH}/backup`;

    for (let path of ["video", ip, "collection"]) {
        videoPath += `/${path}`;
        if (!FS.existsSync(videoPath)) {
            FS.mkdirSync(videoPath);
        }
    }

    const input = `${imagePath}/collection/*.jpg`;
    const converting = `${videoPath}/converting... please wait.mp4`;
    const output = `${videoPath}/collection.mp4`;
    const framesPerSecond = CONFIG.framesPerSecond;

    if (COLLECTION_COMMANDS.hasOwnProperty(id)) {
        COLLECTION_COMMANDS[id].kill("SIGINT");
    }

    COLLECTION_COMMANDS[id] = FFMPEG(input);
    COLLECTION_COMMANDS[id]
        .addInputOption("-r", framesPerSecond, "-pattern_type", "glob")
        .addOutputOption("-s", "hd1080", "-shortest", "-b:v", "1000k")
        .videoCodec("h264_nvenc")
        .on("stderr", function (err) {})
        .on("error", function (err, stdout, stderr) {})
        .on("end", function (err, stdout, stderr) {
            FS.move(converting, output, { overwrite: true }, (err) => {
                if (err) return console.error(err);
            });
        })
        .save(converting);
}

/*
    Periodically clear backups that are one month overdue.
*/
function clearExpiredBackup(rtsp) {
    const ip = rtsp.split("@").pop();
    const today = new Date().toISOString().slice(0, 10);

    ["image"].forEach((path) => {
        // ['image', 'video'].forEach((path) => {
        FS.readdir(
            `${TIME_LAPSE_PATH}/backup/${path}/${ip}`,
            (err, dateList) => {
                dateList = dateList.filter((date) => date !== "collection");
                dateList.forEach((date) => {
                    const diffTime = Math.abs(new Date(today) - new Date(date));
                    const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                    );

                    if (diffDays > CONFIG.retentionDays) {
                        FS.rmdirSync(
                            `${TIME_LAPSE_PATH}/backup/${path}/${ip}/${date}`,
                            {
                                recursive: true,
                                force: true,
                            }
                        );
                    }
                });
            }
        );
    });

    // FS.readdir(`${TIME_LAPSE_PATH}/backup/video/${ip}/${today}`, (err, filenameList) => {
    // 	if (err) throw err;

    // 	filenameList.pop();

    // 	if (filenameList.length > 0) {
    // 		filenameList.forEach((filename) => {
    // 			FS.rmSync(`${TIME_LAPSE_PATH}/backup/video/${ip}/${today}/${filename}`, {
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
    const source = JSON.parse(FS.readFileSync(CONFIG_PATH, "utf8"));
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
                    // ImageToVideo(rtsp);
                });
            }
            return runProcesses;
        })(),
        1000 * CONFIG.screenshotFrequencyInSeconds
    );
}

APP.use(CORS());
APP.use(EXPRESS.json());
APP.use(EXPRESS.static(__dirname));

APP.get("/generateTimeLapse", (req, res) => {
    try {
        if (CONFIG.allRtspList.length > 0) {
            for (const rtsp of CONFIG.allRtspList) {
                generateTimeLapse(rtsp);
            }
        }

        res.send("success");
    } catch (err) {
        res.send(err.message);
        return;
    }
});

APP.get("/forceReloadSystem", (req, res) => {
    try {
        // Force reload main process.
        SPAWN(`${PM2_Path} reload time-lapse --force`, { shell: true });

        res.send("success");
    } catch (err) {
        res.send(err.message);
        return;
    }
});

APP.post("/updateConfig", (req, res) => {
    const { data } = req.body;
    try {
        JSON.parse(data);

        FS.writeFile(CONFIG_PATH, data, (err) => {
            if (err) throw err;

            setRtspList();
            clearInterval(INTERVAL_PROCESS);
            INTERVAL_PROCESS = getInterval();
        });

        res.send("success");
    } catch (err) {
        res.send(err.message);
        return;
    }
});

APP.post("/reloadFFmpeg", (req, res) => {
    const { data } = req.body;

    console.log(data);

    try {
        const rtsp = CONFIG.allRtspList
            .filter(
                (rtsp) =>
                    rtsp
                        .split("@")
                        .pop()
                        .split("/")
                        .shift()
                        .match(/\d/g)
                        .join("") == data.match(/\d/g).join("")
            )
            .join(" ");

        if (rtsp) {
            RTSPToImage(rtsp);
        } else throw "RTSP not found";

        res.send("success");
    } catch (err) {
        res.send(err);
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
                    setTimeout(() => {
                        for (const rtsp of CONFIG.allRtspList) {
                            generateTimeLapse(rtsp);
                        }
                        for (const rtsp of CONFIG.allRtspList) {
                            clearExpiredBackup(rtsp);
                        }
                    }, 300000);
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
process.on("SIGINT", (code) => {
    String("SIGINT")
        .split("")
        .forEach((word) => {
            const slashes = String("|").repeat(30);
            console.log(`${slashes} ${word} ${slashes}`);
        });

    // Terminate all processes related to ffmpeg and media server.
    // const killProcesses = SPAWN("killall -9 ffmpeg", {
    //     shell: true,
    // });

    // Terminate all zombie processes.
    const killZombieProcesses = SPAWN(
        `ps -Al | grep -w Z | awk '{print $4}' | xargs sudo kill -9`,
        {
            shell: true,
        }
    );
});
