const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'index'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'static/js/[name].[hash:8].js',
        publicPath: '/',
        chunkFilename: 'static/js/chunk/[name].[chunkHash:8].js',
    },
    performance: {
        hints: false,
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'public'),
                to: path.join(__dirname, 'build', 'static', 'build'),
                publicPath: '/',
                force: true,
            },
        ]),
        new HtmlPlugin({
            title: 'Demo',
            filename: 'index.html',
            template: path.join(__dirname, 'src', 'templates/default.html'),
            chunks: ['index', 'manifest'],
            hash: false,
        }),
    ],
}
