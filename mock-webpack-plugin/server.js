var express = require('express');
var path = require('path');
var watch = require('watch');
var fs = require('fs');
var globby = require('globby');

var mockData = {};
var errorMessage = [];

function throttle(method, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(context, args);
        }, delay);
    }

}

function watchMockDir(dir) {
    watch
        .watchTree(dir, function (modifiedFile, curStat, preStat) {
            throttle(function () {
                var files = globby.sync(['**.js'], {cwd: dir});
                errorMessage = [];
                mockData = {};
                files.forEach((file) => {
                    var content = fs.readFileSync(path.join(dir, file), 'utf-8')
                    var a = {};
                    try {
                        a = eval(content)
                        Object.assign(mockData, a);
                    } catch (e) {
                        errorMessage.push({file: file, message: e.message})
                    }
                })
            }, 300)()
        })
}

function initServer({
    dir = path.join(process.cwd(), './mock'),
    port = 9090
}) {
    var app = express();
    watchMockDir(dir);
    app.use(function (req, res, next) {
        res.set('Mock-Server', 'true')
        next();
    })
    app.use(express.static(path.join(__dirname, '../')))
    app.use(express.static(path.join(__dirname, '../src/views')))

    app.use(function (req, res) {
        console.log('proxy mock:', req.path);
        if (errorMessage.length) {
            res.json({error: 1, message: 'mock 文件错误.', data: errorMessage})
            return;
        }
        if (mockData[req.path]) {
            res.json(mockData[req.path])
        } else {
            res.json({error: 1, message: 'No such proxy'})
        }
    })
    var server = app.listen(port, function () {
        var host = server
            .address()
            .address;
        var port = server
            .address()
            .port;
        console.log('Mock server listening at http://%s:%s', host, port);
    });
    return server;
}

module.exports = initServer;