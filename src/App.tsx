import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import React, { Suspense } from 'react'
import {
    HashRouter, Redirect, Route, Switch,
} from 'react-router-dom'
import './assets/theme/index.less'
import './index.less'
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
            <HashRouter>
                <Switch>
                    <Route path="/" render={renderChildPage} />
                </Switch>
            </HashRouter>
        )
    }
}

export default App
