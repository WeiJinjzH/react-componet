import { hot } from 'react-hot-loader/root'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import React from 'react'
import {
    HashRouter, Redirect, Route, Switch,
} from 'react-router-dom'
import './assets/theme/index.less'
import './index.less'
import Login from './layout/login'
import MainLayout from './layout/main'
import routes from './routes'

class App extends React.Component {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <HashRouter>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route
                            path="/forget-password"
                            render={props => <Login {...props} showForgetPasswordModal />}
                        />
                        <Route
                            path="/"
                            render={(props) => {
                                // if (!localStorage.user) {
                                //     return <Redirect to="/login" />
                                // }
                                return (
                                    <MainLayout {...props}>
                                        {
                                            (nodeMap, loadingMenus) => (
                                                <Switch>
                                                    {
                                                        routes.map(route => (
                                                            <Route
                                                                key={route.path}
                                                                path={route.path}
                                                                exact={route.exact}
                                                                strict
                                                                render={(routeProps) => {
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
                                                                        return <Comp {...routeProps} />
                                                                    }
                                                                    if (!nodeMap) {
                                                                        return (
                                                                            <div
                                                                                style={{ textAlign: 'center', padding: 100 }}
                                                                            >
                                                                                菜单数据获取异常
                                                                            </div>
                                                                        )
                                                                    }
                                                                    /* 菜单是否需要校验权限 */
                                                                    if (
                                                                        route.needCheckPermission
                                                                        && !nodeMap[route.path]
                                                                    ) {
                                                                        return <Redirect to="/403" />
                                                                    }
                                                                    return <Comp {...routeProps} />
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                    <Redirect to="/404" />
                                                </Switch>
                                            )
                                        }
                                    </MainLayout>
                                )
                            }}
                        />
                    </Switch>
                </HashRouter>
            </LocaleProvider>
        )
    }
}

export default hot(App)
