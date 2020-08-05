const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const proxies = require('./proxy-config')
const mockerServer = require('./mocker-server')

const devPort = process.env.port || 8090
const mockPort = process.env.mockport || Number(devPort) + 1
const enableMock = process.env.mock

if (enableMock) {
    proxies['/mock'] = {
        target: `http://localhost:${mockPort}`,
        pathRewrite: { '/mock': '' },
        changeOrigin: true,
        toProxy: false,
        prependPath: false,
        secure: false,
    }
}

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

enableMock && mockerServer.listen(mockPort, '0.0.0.0', () => {
    global.console.log(`mocker server listening on port ${mockPort}`)
})
