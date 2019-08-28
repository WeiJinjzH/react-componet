const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const proxies = require('./proxy-config')

const devPort = process.env.port

const options = {
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, './'),
    compress: false,
    disableHostCheck: true,
    host: '0.0.0.0', // 允许通过其他ip访问
    proxy: Object.assign(proxies, {
        '/**': {
            target: 'https://localhost:8080',
            changeOrigin: true,
            toProxy: false,
            prependPath: false,
            secure: false, // 接受 运行在 https 上的服务
        },
    }),
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(devPort, '0.0.0.0', () => {
    global.console.log(`dev server listening on port ${devPort}`)
})
