import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import React, { Suspense } from 'react'
import {
    HashRouter, Redirect, Route, Switch,
} from 'react-router-dom'
import './assets/theme/index.less'
import './index.less'
import Login from './layout/login'
import MainLayout from './layout/main'
import routes from './routes'
import ErrorBoundary from './components/ErrorBoundary'

function Loading(Comp, props) {
    return (
        <Suspense
            fallback={(
                <div style={{ textAlign: 'center', padding: '100px' }}>
                    <Spin delay={100} size="large" tip="正在加载页面资源..." />
                </div>
            )}
        >
            <ErrorBoundary>
                <Comp {...props} />
            </ErrorBoundary>
        </Suspense>
    )
}

class App extends React.Component {
    render() {
        const renderChildPage = (props) => {
            if (!localStorage.user) {
                return <Redirect to="/login" />
            }
            return (
                <MainLayout
                    {...props}
                    render={(pathMap, loadingMenus) => (
                        <Switch>
                            {
                                routes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact}
                                        strict
                                        render={(componentProps) => {
                                            if (loadingMenus) {
                                                /* 菜单数据获取中 */
                                                return (
                                                    <Spin
                                                        size="large"
                                                        style={{ width: '100%', padding: 100 }}
                                                        tip="获取菜单数据中..."
                                                    />
                                                )
                                            }
                                            const Comp = route.component
                                            if (!route.needCheckPermission) {
                                                return Loading(Comp, componentProps)
                                            }
                                            if (!pathMap) {
                                                return <div style={{ textAlign: 'center', padding: 100 }}>菜单数据获取异常</div>
                                            }
                                            /* 菜单是否需要校验权限 */
                                            if (route.needCheckPermission && route.path === '/' && !pathMap.index) {
                                                return <Redirect to="/403" />
                                            } if (route.needCheckPermission && route.path !== '/' && !pathMap[route.path.slice(1)]) {
                                                return <Redirect to="/403" />
                                            }
                                            return Loading(Comp, componentProps)
                                        }}
                                    />
                                ))
                            }
                            <Redirect to="/404" />
                        </Switch>
                    )}
                />
            )
        }
        const validateMessages = {
            required: '必填',
        }
        return (
            <ConfigProvider
                locale={zhCN}
                form={{ validateMessages }}
                getPopupContainer={(el) => {
                    if (el?.getAttribute('class')?.includes('ant-menu-item')) {
                        return document.body
                    }
                    const modals = document.getElementsByClassName('ant-modal-body')
                    if (modals && modals.length) {
                        const modal = modals[modals.length - 1]
                        if (modal.contains(el)) {
                            return modal as HTMLElement
                        }
                    }
                    return document.getElementById('main-content') || document.body
                }}
            >
                <HashRouter>
                    <Switch>
                        <Route path="/login" render={(props) => Loading(Login, props)} />
                        <Route path="/" render={renderChildPage} />
                    </Switch>
                </HashRouter>
            </ConfigProvider>
        )
    }
}

export default App
