var initServer = require('./server')
var path = require('path')

initServer({
    dir: path.join(__dirname, '../mock'),
    port: 9999
})

