import {
    ConfigProvider, Dropdown, Layout, Menu, message, Modal,
} from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { http } from 'src/utils/http'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import './layout.less'
import MainLayoutContext from './MainLayoutContext'

const logo = require('src/assets/images/logo.svg')

const {
    Header, Sider, Content, Footer,
} = Layout

/** 通过缓存map及selectedKey 获取OpenKeys */
const getOpenKey = (map = {}, key, openKeys = []) => {
    if (map[key] && map[key].parent) {
        const parentId = map[key].parent.id
        openKeys.push(parentId)
        if (map[parentId]) {
            getOpenKey(map, map[parentId].id, openKeys)
        }
    }
    return openKeys
}

class MainLayout extends React.Component<any, any> {
    navMap: any;

    nodeMap: {};

    constructor(props) {
        super(props)
        this.state = {
            collapsed: window.localStorage.getItem('collapsed') !== '0',
            menuLeft: [],
            openKeys: [],
            navList: [],
            showHeader: window.location.hash !== '#/',
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    componentDidMount() {
        const { history } = this.props
        window.onstorage = (e) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    this.forceUpdate()
                } else {
                    Modal.info({
                        title: '您已退出登录, 请重新登录!',
                        content: moment().format('YYYY-MM-DD hh:mm:ss'),
                        okText: '前往登录页',
                        onOk: () => {
                            history.push('/login')
                        },
                    })
                }
            }
        }
    }

    /** 收缩/展开 侧边菜单栏 */
    toggleMenu() {
        const { collapsed } = this.state
        const { history } = this.props
        let openKeys = []
        if (collapsed) {
            openKeys = getOpenKey(this.nodeMap, history.location.pathname)
        }
        this.setState({
            collapsed: !collapsed,
            openKeys,
        }, () => {
            window.dispatchEvent && window.dispatchEvent(new Event('resize'))
            window.localStorage.setItem('collapsed', String(~~!collapsed))
        })
    }

    render() {
        const {
            collapsed,
            // showHeader
            openKeys,
            menuLeft,
            navList,
            loadingMenus,
        } = this.state
        const showHeader = true // TODO:
        const { history, render } = this.props
        return (
            <MainLayoutContext.Provider
                value={{
                    collapsed,
                }}
            >
                <Layout id="mian-layout" style={{ paddingLeft: collapsed ? 80 : 220 }}>
                    <Sider
                        trigger={null}
                        collapsedWidth={80}
                        width={220}
                        collapsible
                        collapsed={collapsed}
                    >
                        <Link className="logo" to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </Sider>
                    <Layout>
                        {
                            showHeader && (
                                <Header id="main-header" style={{ width: `calc(100% - ${collapsed ? 80 : 220}px)` }}>
                                    {
                                        collapsed ? (
                                            <MenuUnfoldOutlined
                                                style={{ color: '#000000a6', margin: '0 10px', fontSize: 20 }}
                                                onClick={this.toggleMenu}
                                            />
                                        ) : (
                                            <MenuFoldOutlined
                                                style={{ color: '#000000a6', margin: '0 10px', fontSize: 20 }}
                                                onClick={this.toggleMenu}
                                            />
                                        )
                                    }
                                </Header>
                            )
                        }
                        <ConfigProvider getPopupContainer={() => document.getElementById('main-content') || document.body}>
                            <Content id="main-content" style={{ paddingTop: showHeader ? 50 : 0 }}>
                                {render(this.nodeMap, loadingMenus)}
                            </Content>
                        </ConfigProvider>
                        {
                            showHeader && (
                                <Footer id="main-footer">
                                    <div style={{ textAlign: 'center' }}>© Demo</div>
                                </Footer>
                            )
                        }
                    </Layout>
                </Layout>
            </MainLayoutContext.Provider>
        )
    }
}

export default MainLayout
