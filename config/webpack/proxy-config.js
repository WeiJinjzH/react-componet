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

proxyTargets.forEach((proxyTarget) => {
    proxies[`/${proxyTarget.targetName}`] = {
        target: proxyTarget.target,
        pathRewrite: { [`/${proxyTarget.targetName}`]: '' },
        changeOrigin: true,
        toProxy: false,
        prependPath: false,
    }
})

module.exports = proxies
