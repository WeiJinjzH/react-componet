const path = require('path')
const OpenBrowser = require('react-dev-utils/openBrowser')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const devPort = process.env.port
const rootDir = path.join(__dirname, '..', '..')

module.exports = {
    entry: {
        index: [
            path.join(rootDir, 'src', 'index'),
        ],
    },
    output: {
        path: path.join(rootDir, './'),
        filename: 'js/[name].[hash:8].js',
        publicPath: '/',
        chunkFilename: 'js/chunk/[name].[chunkhash:8].js',
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(rootDir, 'public'),
                to: path.join(rootDir, 'static', 'build'),
                force: true,
            },
        ]),
        new HtmlPlugin({
            title: 'Demo',
            filename: 'index.html',
            template: path.join(rootDir, 'src', 'templates/dev.html'),
            chunks: ['index', 'manifest'],
            hash: false,
        }),
        new ReactRefreshWebpackPlugin({ overlay: false }),
        () => {
            if (OpenBrowser(`http://localhost:${devPort}`)) {
                global.console.log(`已打开浏览器标签: http://localhost:${devPort}\n请等待项目编译完成。`)
            }
        },
    ],
    devtool: 'source-map',
}
