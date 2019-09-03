const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const rootDir = path.join(__dirname, '..', '..')

module.exports = {
    entry: {
        index: path.join(rootDir, 'src', 'index'),
    },
    output: {
        path: path.join(rootDir, 'build'),
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
                from: path.join(rootDir, 'public'),
                to: path.join(rootDir, 'build', 'static', 'build'),
                publicPath: '/',
                force: true,
            },
        ]),
        new HtmlPlugin({
            title: 'Demo',
            filename: 'index.html',
            template: path.join(rootDir, 'src', 'templates/default.html'),
            chunks: ['index', 'manifest'],
            hash: false,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(rootDir, 'build')],
        }),
    ],
}
