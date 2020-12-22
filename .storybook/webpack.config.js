const webpack = require('webpack')
const os = require('os')
const path = require('path')

const config = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
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
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            utils: ['src/utils/utils.ts', 'default'],
            NP: 'number-precision',
        }),
    ],
}

module.exports = config
