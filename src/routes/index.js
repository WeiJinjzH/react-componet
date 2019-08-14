import asyncDecorator from 'src/components/AsyncWrapper/decorator'

function handleChunkError(error, cb) {
    if (window.sessionStorage.getItem('prevChunkError') !== error.request) {
        window.sessionStorage.setItem('prevChunkError', error.request)
        window.location.reload(true)
    } else {
        cb(null, () => <div style={{ textAlign: 'center', marginTop: 100 }}>页面资源加载出错, 请检查网络状态。</div>)
    }
}

const pageRoutes = [
    /* 首页 */
    {
        name: '首页',
        path: '/',
        exact: true,
        needCheckPermission: false,
        component: asyncDecorator((nextState, cb) => {
            import(/* webpackChunkName: "home" */ '../pages/Home')
                .then(({ default: Component }) => {
                    cb(null, Component)
                })
                .catch((error) => {
                    handleChunkError(error, cb)
                })
        }),
    },
    /* 无权限访问 */
    {
        name: '无权限访问',
        path: '/403',
        exact: true,
        component: asyncDecorator((nextState, cb) => {
            import(/* webpackChunkName: "403" */ '../pages/Error/403')
                .then(({ default: Component }) => {
                    cb(null, Component)
                })
                .catch((error) => {
                    handleChunkError(error, cb)
                })
        }),
    },
    /* 页面不存在 */
    {
        name: '页面不存在',
        path: '/404',
        component: asyncDecorator((nextState, cb) => {
            import(/* webpackChunkName: "404" */ '../pages/Error/404')
                .then(({ default: Component }) => {
                    cb(null, Component)
                })
                .catch((error) => {
                    handleChunkError(error, cb)
                })
        }),
    },
]

export default pageRoutes
