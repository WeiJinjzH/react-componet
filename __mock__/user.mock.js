const Mock = require('mockjs')

const user = {
    'GET /web-user/send-login-phone-code': (req, res, next) => {
        res.json(Mock.mock({
            code: 0,
            data: null,
            msg: 'success',
            success: true,
        }))
        next()
    },
    'PUT /web-user/login': (req, res, next) => {
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
    'GET /web-user/get-user-info': (req, res, next) => {
        res.json(Mock.mock({
            code: 0,
            data: {
                username: '@cname',
                avatar: 'http://avatar.3sd.me/96',
                showUrl: '',
                token: '@guid',
                certifNo: '360000110002125',
                certifType: '10',
                certifTypeLabel: '',
                coreFlag: 1,
                email: 'wanglei@ftechain.com',
                loginName: '15766006815',
                orgName: '仁和药业股份有限公司',
                phone: '15766006801',
                showPermissionTips: false,
            },
            errorUrl: '',
            msg: 'success',
            success: true,
        }))
        next()
    },
}

module.exports = user
