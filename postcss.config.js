const Autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        new Autoprefixer({
            browsers: [
                'defaults',
                'last 2 versions',
            ],
        }),
    ],
}
