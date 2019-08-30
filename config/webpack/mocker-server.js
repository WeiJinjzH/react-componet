const express = require('express')
const path = require('path')
const apiMocker = require('mocker-api')

const app = express()

apiMocker(app, path.resolve(__dirname, '../../api-mocker/index.js'))

module.exports = app
