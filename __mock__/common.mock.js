
const Mock = require('mockjs')

const menu = {
    'GET /table': (req, res, next) => {
        const { pageSize = 10, pageNum = 1, dataSize } = req.query
        const total = dataSize || Mock.Random.integer(0, 100)
        const pages = Math.ceil(total / pageSize)
        res.json(Mock.mock({
            code: 0,
            data: {
                hasNextPage: (pages - pageNum) > 0,
                hasPreviousPage: pageNum > 1,
                isFirstPage: true,
                isLastPage: true,
                [`list|0-${total}`]: [
                    {
                        'rowIndex|+1': 1,
                        id: '@id',
                        name: '@cname',
                        address: '@county(true)',
                        avatar: `https://api.uomg.com/api/rand.avatar?&format=images&row-index=@rowIndex&timestamp=${new Date().getTime()}`,
                        createTime: '@date',
                    },
                ],
                // navigateFirstPage: 1,
                // navigateLastPage: 1,
                // navigatePages: 8,
                // navigatepageNums: [1],
                prePage: Math.max(0, pageNum - 1),
                nextPage: Math.min(pages, pageNum + 1),
                pageNum,
                pageSize,
                pages,
                size: Math.min(pageSize, total - (pageSize * (pageNum - 1))),
                startRow: pageSize * (pageNum - 1),
                endRow: Math.min(pageSize * pageNum, total),
                total,
            },
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
