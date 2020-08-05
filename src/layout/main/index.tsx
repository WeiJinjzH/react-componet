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

const getPermissionMap = (data, parentMap = {}) => {
    data.forEach((node) => {
        parentMap[node.id] = {
            __enable: true,
        }
        if (node && node.nodes && node.nodes.length > 0) {
            getPermissionMap(node.nodes, parentMap[node.id])
        }
    })
    return parentMap
}

/** 格式化菜单数据 */
const formatMenuData = (nodes = [], parent, nodeMap = {}, navId) => {
    nodes.forEach((node) => {
        if (parent) {
            node.parent = parent
        }
        node.navId = navId
        nodeMap[node.href] = node
        if (node.nodes && !node.buttonContainer) {
            formatMenuData(node.nodes, node, nodeMap, navId)
        }
    })
    return nodeMap
}

/** 顶部导航栏数据格式化 */
const formatNavMenuData = (data) => {
    const navList = []
    const navMap = {}
    const nodeMap = {}
    data.forEach((nav) => {
        navList.push(nav)
        navMap[nav.id] = nav
        if (nav.href) {
            nodeMap[nav.href] = nav
        }
        nav.nodes.forEach((navNode) => {
            navNode.iconCss = navNode.iconCss || 'table'
        })
        formatMenuData(
            nav.nodes,
            nav,
            nodeMap,
            (nav.href || nav.id),
        )
    })
    return {
        navList, navMap, nodeMap,
    }
}

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
        this.getMenuData = this.getMenuData.bind(this)
        this.doLogout = this.doLogout.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.renderMenuItem = this.renderMenuItem.bind(this)
        this.onLeftMenuClick = this.onLeftMenuClick.bind(this)
        this.onClickNavItem = this.onClickNavItem.bind(this)
        this.onClickNavTitle = this.onClickNavTitle.bind(this)
        this.onHashChangeListener = this.onHashChangeListener.bind(this)
    }

    componentDidMount() {
        const { history } = this.props
        this.getMenuData()
        window.addEventListener('hashchange', this.onHashChangeListener)
        window.onstorage = (e) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    this.getMenuData(true)
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

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChangeListener)
    }

    /** 首页隐藏Header, locationHash监听器 */
    onHashChangeListener() {
        const { history } = this.props
        const { openKeys: stateOpenKeys } = this.state
        if (this.nodeMap) {
            const openKeys = getOpenKey(this.nodeMap, history.location.pathname)
            const node = this.nodeMap[history.location.pathname]
            const menuLeft = (this.navMap[node.navId] && this.navMap[node.navId].nodes) || []
            this.setState({
                menuLeft,
                openKeys: [...new Set([...stateOpenKeys, ...openKeys])],
            })
        }
        this.setState({
            showHeader: window.location.hash !== '#/',
        })
    }

    onLeftMenuClick({ item, key }) {
        const { history } = this.props
        history.push(key)
        this.setState({
            showHeader: key !== '/',
        })
    }

    onClickNavItem({ item, key }) {
        const { history } = this.props
        const node = this.nodeMap[key]
        if (node) {
            history.push(key)
            const menuLeft = (this.navMap[node.navId] && this.navMap[node.navId].nodes) || []
            this.setState({
                menuLeft,
            })
        }
    }

    onClickNavTitle({ key }) {
        const { history } = this.props
        const nav = this.navMap[key]
        if (nav && nav.nodes && nav.nodes.length > 0) {
            history.push(nav.nodes[0].href)
            this.setState({
                menuLeft: nav.nodes,
            })
        }
    }

    /** 获取菜单数据 */
    getMenuData(forced?: boolean) {
        const cacheMenu = window.sessionStorage.getItem('menuData')
        if (!forced && cacheMenu) {
            const menuData = JSON.parse(cacheMenu) || []
            this.handleMenuData(menuData)
            return
        }
        this.setState({ loadingMenus: true })
        http.get('/manage/menu/get-menu').then((res) => {
            if (res.code === 0) {
                window.sessionStorage.setItem('menuData', JSON.stringify(res.data))
                this.handleMenuData(res.data)
            }
        }).finally(() => {
            this.setState({ loadingMenus: false })
        })
    }

    handleMenuData(menuData) {
        const { collapsed } = this.state
        const { history } = this.props
        const {
            navList, navMap, nodeMap,
        } = formatNavMenuData(menuData)
        const permissionMap = getPermissionMap(menuData)
        window.sessionStorage.setItem('permissions', JSON.stringify(permissionMap))
        this.nodeMap = nodeMap
        this.navMap = navMap
        let openKeys = []
        if (!collapsed) {
            openKeys = getOpenKey(nodeMap, history.location.pathname)
        }
        const node = nodeMap[history.location.pathname] || {}
        const { navId } = node
        const navNode = navMap[navId]
        this.setState({
            openKeys,
            navList,
            menuLeft: (navNode && navNode.nodes) || [],
        })
    }

    doLogout() {
        const { history } = this.props
        Modal.confirm({
            title: '你确定要注销吗？',
            onOk: () => {
                message.loading('注销中...')
                http.put('/web-user/logout').then((res) => {
                    message.destroy()
                    if (res.code === 0) {
                        localStorage.removeItem('user')
                        sessionStorage.removeItem('menuData')
                        history.push('/login')
                    } else {
                        Modal.error({
                            title: res.msg,
                        })
                    }
                })
            },
        })
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

    renderMenuItem(items = []) {
        return items.map((item) => {
            if (Array.isArray(item.nodes) && item.nodes.length && !item.buttonContainer) {
                return (
                    <Menu.SubMenu
                        key={item.href || item.id}
                        title={(
                            <>
                                {/* {item.iconCss && <Icon type={item.iconCss} />} */}
                                <span>
                                    {item.text}
                                </span>
                            </>
                        )}
                    >
                        { this.renderMenuItem(item.nodes) }
                    </Menu.SubMenu>
                )
            }
            return (
                <Menu.Item key={item.href || item.id}>
                    {/* {item.iconCss && <Icon type={item.iconCss} />} */}
                    <span>
                        {item.text || item.path}
                    </span>
                </Menu.Item>
            )
        })
    }

    renderNavItem(items = []) {
        return items.map((item) => {
            if (Array.isArray(item.nodes) && item.nodes.length && !item.buttonContainer) {
                return (
                    <Menu.SubMenu
                        onTitleClick={this.onClickNavTitle}
                        key={item.href || item.id}
                        title={(
                            <>
                                {/* {item.iconCss && <Icon type={item.iconCss} />} */}
                                <span>
                                    {item.text}
                                </span>
                            </>
                        )}
                    >
                        { this.renderNavItem(item.nodes) }
                    </Menu.SubMenu>
                )
            }
            return (
                <Menu.Item key={item.href || item.id}>
                    {/* {item.iconCss && <Icon type={item.iconCss} />} */}
                    <span>
                        {item.text}
                    </span>
                </Menu.Item>
            )
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
                    getMenuData: this.getMenuData,
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
                        <Menu
                            style={{ paddingBottom: showHeader ? 0 : 50 }}
                            className="menu-list"
                            openKeys={openKeys}
                            onOpenChange={(_openKeys) => { this.setState({ openKeys: _openKeys }) }}
                            onClick={this.onLeftMenuClick}
                            selectedKeys={[history.location.pathname]}
                            theme="dark"
                            mode="inline"
                        >
                            { this.renderMenuItem(menuLeft) }
                        </Menu>
                        {
                            !showHeader && (
                                <div className="menu-footer">
                                    {
                                        collapsed ? (
                                            <MenuUnfoldOutlined
                                                style={{ fontSize: 20 }}
                                                onClick={this.toggleMenu}
                                            />
                                        ) : (
                                            <MenuFoldOutlined
                                                style={{ fontSize: 20 }}
                                                onClick={this.toggleMenu}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
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
                                    <div
                                        style={{ display: 'inline-block', flex: 1 }}
                                    >
                                        <Menu
                                            style={{ display: 'inline-block', background: 'none', borderBottom: 'none' }}
                                            onClick={this.onClickNavItem}
                                            selectedKeys={[history.location.pathname]}
                                            mode="horizontal"
                                        >
                                            { this.renderNavItem(navList) }
                                        </Menu>
                                    </div>
                                    <Dropdown
                                        overlay={(
                                            <Menu>
                                                <Menu.Item onClick={this.doLogout}>
                                                    {/* <Icon type="logout" /> */}
                                                    <span>退出</span>
                                                </Menu.Item>
                                            </Menu>
                                        )}
                                    >
                                        <span
                                            style={{
                                                marginLeft: 10,
                                                marginRight: 20,
                                                color: '#999',
                                            }}
                                        >
                                            {/* <Icon type="user" /> */}
                                            {/* {JSON.parse(localStorage.getItem('user')).loginName} */}
                                            {/* <Icon type="down" /> */}
                                        </span>
                                    </Dropdown>
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
