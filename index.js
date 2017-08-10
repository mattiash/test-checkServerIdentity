'use strict'

const https = require('https')
const fs = require('fs')

let server = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.pem'),
}, function (req, res) {
    res.end('my server')
})

server.listen(3000, function () {
    let ca = fs.readFileSync('ca.pem')

    https.get({
        ca: ca,
        hostname: '::1',
        port: 3000,
        path: '/',
        method: 'GET',
    }, res => {
        console.log('Test 1 ok: Shall connect to ::1')
    }).on('error', err => {
        console.log('Test 1 failed: Shall connect to ::1. Error: ', err.reason)
    })

    https.get({
            ca: ca,
            hostname: '127.0.0.1',
            port: 3000,
            path: '/',
            method: 'GET',
        }, res => {
        console.log('Test 2 ok: Shall connect to 127.0.0.1')
    }).on('error', err => { 
        console.log('Test 2 failed: Shall connect to 127.0.0.1. Error: ', err.reason) 
    })
})
