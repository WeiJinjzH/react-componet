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
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
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
                    'postcss-loader',
                ],
            },
            {
                test: /\.(gif|jpg|png|svg|woff|eot|ttf|pdf)\??.*$/,
                loader: 'url-loader?limit=1000',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            utils: ['src/assets/utils/utils.js', 'default'],
            NP: 'number-precision',
        }),
    ],
}

module.exports = config
