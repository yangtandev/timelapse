/* 
    Express.js & Node.js
*/
const http = require('http')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const port = 7000

/*
    Paths
*/
const clientListPath = `./client-list.json`
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(`/usr/bin/ffmpeg`)

/* 
    Variables
*/
const config = {}
const imageCommands = {}
const videoCommands = {}
const backupPath = `./backup`

/*
    Set rtsp list related variables.
*/
function setRtspList() {
    const source = JSON.parse(fs.readFileSync(clientListPath, 'utf8'))
    config.clinetList = source.clinetList

    if (config.clinetList.length > 0) {
        config.allRtspList = config.clinetList
            .map((clinet) => clinet.rtspList)
            .reduce((prev, curr) => prev.concat(curr))
    } else {
        config.allRtspList = []
    }
}

function RTSPToImage(rtsp) {
    const ip = rtsp.split('@').pop()
    const id = ip.match(/\d+/g)
    const now = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    const today = now.toISOString().slice(0, 10)
    const fileName = now.toISOString().slice(0, -5).split('T').join(' ')
    let output = backupPath

    for (let path of ['','image', ip, today]) {
        output += `/${path}`
        if (!fs.existsSync(output)) {
            fs.mkdirSync(output)
        }
    }

    output += `/${fileName}.jpg`

    if (imageCommands.hasOwnProperty(id)) {
        imageCommands[id].kill('SIGINT')
    }

    imageCommands[id] = ffmpeg(rtsp)
    imageCommands[id]
        .addInputOption('-rtsp_transport', 'tcp', '-re', '-y')
        .addOutputOption('-vframes', 1)
        .on('stderr', function (err) {})
        .on('error', function (err, stdout, stderr) {})
        .on('end', function (err, stdout, stderr) {})
        .save(output)
}

function ImageToVideo(rtsp) {
    const ip = rtsp.split('@').pop()
    const id = ip.match(/\d+/g)
    const now = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    const today = now.toISOString().slice(0, 10)
    const fileName = now.toISOString().slice(0, -5).split('T').join(' ')
    let imagePath = `${backupPath}/image/${ip}/${today}/*.jpg`
    let videoPath = `${backupPath}`

    for (let path of ['video',ip, today]) {
        videoPath += `/${path}`
        if (!fs.existsSync(videoPath)) {
            fs.mkdirSync(videoPath)
        }
    }

    videoPath += `/${fileName}.mp4`

    if (videoCommands.hasOwnProperty(id)) {
        videoCommands[id].kill('SIGINT')
    }

    videoCommands[id] = ffmpeg(imagePath)
    videoCommands[id]
        .addInputOption('-r', 24, '-pattern_type', 'glob')
        .addOutputOption('-s', 'hd1080')
        .videoCodec('libx264')
        .on('stderr', function (err) {})
        .on('error', function (err, stdout, stderr) {})
        .on('end', function (err, stdout, stderr) {})
        .save(videoPath)
}

function clearExpiredBackup(rtsp) {
    const ip = rtsp.split('@').pop()
    const today = new Date().toISOString().slice(0, 10)

    fs.readdir(`${backupPath}/video/${ip}/${today}`, (err, filenameList) => {
        if (err) throw err

        filenameList.pop()

        if (filenameList.length > 0) {
            filenameList.forEach((filename) => {
                fs.rmSync(`${backupPath}/video/${ip}/${today}/${filename}`, {
                    recursive: true,
                    force: true,
                })
            })
        }
    })
}

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname))

server.listen(port, () => {
    setRtspList()

    setInterval(
        (function captureFrame() {
            if (config.allRtspList.length > 0) {
                config.allRtspList.forEach((rtsp) => {
                    RTSPToImage(rtsp)
                })
            }

            return captureFrame
        })(),
        1000 * 60
    )
    setInterval(() => {
        if (config.allRtspList.length > 0) {
            config.allRtspList.forEach((rtsp) => {
                ImageToVideo(rtsp)
                clearExpiredBackup(rtsp)
            })
        }
    }, 1000 * 60)
})
