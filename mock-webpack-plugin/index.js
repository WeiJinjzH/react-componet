var express = require('express');
var initServer = require('./server')
function MockWebpackPlugin(options) {
    this.options = options;
}

MockWebpackPlugin.prototype.apply = function (compiler) {
    var server = initServer(this.options);
    compiler.plugin("emit", (compilation, callback) => {
        callback();
    });
}

module.exports = MockWebpackPlugin;