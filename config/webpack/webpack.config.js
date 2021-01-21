const webpack = require('webpack')
const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const prodConfig = require('./webpack.config.prod.js')
const devConfig = require('./webpack.config.dev.js')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const isProduction = process.env.mode && process.env.mode.trim() === 'production'
const rootDir = path.join(__dirname, '..', '..')

const config = {
    mode: process.env.mode || 'production',
    optimization: {
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                common: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
            },
        },
        runtimeChunk: {
            name: 'manifest',
        },
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            src: path.join(rootDir, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: ['happypack/loader?id=jsHappy'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: [
                    path.join(rootDir, 'node_modules'),
                    path.join(rootDir, 'src/assets'),
                    path.join(rootDir, 'src/components'),
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './config/postcss.config.js',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: [
                    path.join(rootDir, 'node_modules'),
                    path.join(rootDir, 'src/assets'),
                    path.join(rootDir, 'src/components'),
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[hash:base64:7]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './config/postcss.config.js',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                include: [
                    path.join(rootDir, 'node_modules'),
                    path.join(rootDir, 'src/assets'),
                    path.join(rootDir, 'src/components'),
                ], // 排除 CSS模块化
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './config/postcss.config.js',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                exclude: [
                    path.join(rootDir, 'node_modules'),
                    path.join(rootDir, 'src/assets'),
                    path.join(rootDir, 'src/components'),
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                        },
                    },
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            localsConvention: 'camelCase',
                            esModule: true,
                            modules: {
                                localIdentName: '[local]__[hash:base64:7]',
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './config/postcss.config.js',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(gif|jpg|png|svg|woff|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1000&name=static/assets/[name].[ext]',
            },
        ],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new webpack.ContextReplacementPlugin(
            /moment\/locale$/,
            /zh-cn/,
        ),
        new HappyPack({
            id: 'jsHappy',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
            }],
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL || ''),
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            utils: ['src/utils', 'default'],
            NP: 'number-precision',
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? 'static/css/[name].[chunkhash:8].css' : 'static/css/[name].css',
        }),
    ],
}

if (isProduction) {
    const plugins = [...config.plugins, ...prodConfig.plugins]
    Object.assign(config, prodConfig, { plugins })
} else {
    const plugins = [...config.plugins, ...devConfig.plugins]
    Object.assign(config, devConfig, { plugins })
}
module.exports = config
