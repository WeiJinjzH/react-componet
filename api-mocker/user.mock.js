
const Mock = require('mockjs')

const menu = {
    'PUT /manage/user/login': (req, res, next) => {
        res.json(Mock.mock({
            code: 0,
            data: {
                username: '@cname',
                avatar: 'http://avatar.3sd.me/96',
                showUrl: '',
                token: '@guid',
            },
            errorUrl: '',
            msg: 'success',
            success: true,
        }))
        next()
    },
}

module.exports = menu
