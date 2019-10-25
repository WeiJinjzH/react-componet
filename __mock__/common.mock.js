
const Mock = require('mockjs')

const menu = {
    'GET /table': (req, res, next) => {
        res.json(Mock.mock({
            code: 0,
            'data|0-10': [
                {
                    'rowIndex|+1': 1,
                    id: '@id',
                    name: '@cname',
                    address: '@county(true)',
                    avatar: 'http://avatar.3sd.me/96',
                    createTime: '@date',
                },
            ],
            errorUrl: '',
            msg: 'success',
            success: true,
        }))
        next()
    },
    'GET /form': (req, res, next) => {
        const data = {}
        const fieldsLength = (req.query && req.query.size) || 10
        for (let i = 0; i < fieldsLength; i += 1) {
            data[`field${i + 1}`] = `field${i + 1}`
        }
        res.json(Mock.mock({
            code: 0,
            data,
            errorUrl: '',
            msg: 'success',
            success: true,
        }))
        next()
    },
    'GET /manage/identify/generator': (req, res, next) => {
        res.json(Mock.mock({
            code: 0,
            data: {
                dataCode: Mock.Random.image('156x66', '#F0F0F0', '#000', 'png', '@string(number, 4)'),
                identifyKey: '@guid',
            },
            errorUrl: '',
            msg: 'success',
            success: true,
        }))
        next()
    },
}

module.exports = menu
