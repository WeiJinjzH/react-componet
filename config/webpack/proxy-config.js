const proxyTargets = [
    {
        targetName: 'dev',
        target: 'https://localhost:8080',
    },
    {
        targetName: 'test',
        target: 'https://localhost:8080',
    },
]

const proxies = {}
const BASE_URL = process.env.BASE_URL || ''

proxyTargets.forEach((proxyTarget) => {
    proxies[`/${proxyTarget.targetName}${BASE_URL}`] = {
        target: proxyTarget.target,
        pathRewrite: { [`/${proxyTarget.targetName}${BASE_URL}`]: proxyTarget.baseURL || BASE_URL || '' },
        changeOrigin: true,
        toProxy: false,
        prependPath: false,
        secure: false,
    }
})

module.exports = proxies
