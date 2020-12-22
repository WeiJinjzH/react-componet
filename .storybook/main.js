const path = require('path');
const webpack = require('webpack');

const custom = require('./webpack.config.js')

module.exports = {
    stories: ['../stories/**/*.stories.@(js|mdx)'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-links',
        '@storybook/addon-storysource',
        '@storybook/addon-knobs/register',
    ],
    webpackFinal: (config) => {
        return {
            ...config,
            module: {
              ...config.module,
              rules: [
                ...config.module.rules,
                ...custom.module.rules,
              ]
            },
            plugins: [...config.plugins, ...custom.plugins],
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    src: path.join(__dirname, '..', 'src'),
                },
            },
        }
    }
}
