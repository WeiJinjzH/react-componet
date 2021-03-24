import React from 'react'

const pageRoutes = [
    /* 首页 */
    {
        name: '首页',
        path: '/',
        exact: true,
        needCheckPermission: false,
        component: React.lazy(() => import(
            /* webpackChunkName: "home" */
            '../pages/Home'
        )),
    },
    /* 无权限访问 */
    {
        name: '无权限访问',
        path: '/403',
        exact: true,
        component: React.lazy(() => import(
            /* webpackChunkName: "403" */
            '../pages/Error/403'
        )),
    },
    /* 页面不存在 */
    {
        name: '页面不存在',
        path: '/404',
        exact: false,
        component: React.lazy(() => import(
            /* webpackChunkName: "404" */
            '../pages/Error/404'
        )),
    },
]

export default pageRoutes
