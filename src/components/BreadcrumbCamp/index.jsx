import {
    useEffect, useState, useRef, Icon,
} from 'react'
import { Breadcrumb, Dropdown, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const BreadcrumbCamp = (props) => {
    const { breadcrumbArr } = props
    const menu = (menuArr) => {
        const newMenuArr = [...menuArr]
        newMenuArr.splice(0, 1)
        return (
            <Menu>
                {
                    newMenuArr.map((child, index) => (
                        <Menu.Item key={child.name}>
                            <a href="/">{child.name}</a>
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }
    return (
        <div>
            {/* antd4.0版本之后，Breadcrumb.Item可以和Dropdown一样传入overlay={menu}, 方便了很多 */}
            <Breadcrumb separator=">">
                {
                    breadcrumbArr.map((item, index) => {
                        if (Array.isArray(item)) {
                            return (
                                <Breadcrumb.Item overlay={menu(item)} key={`name-${index}`}>
                                    { item[0].path ? (<a href={`/#${item[0].path}`}>{item[0].name}</a>) : item[0].name}
                                </Breadcrumb.Item>
                            )
                        } else {
                            return (
                                <Breadcrumb.Item key={item.name}>
                                    { item.path ? (<a href={`/#${item.path}`}>{item.name}</a>) : item.name}
                                </Breadcrumb.Item>
                            )
                        }
                    })
                }
            </Breadcrumb>

            {/* antd4.0版本之前的写法 */}
            {/* <Breadcrumb separator=">">
                {
                    breadcrumbArr.map((item, index) => {
                        if (Array.isArray(item)) {
                            return (
                                <Breadcrumb.Item key={`name-${index}`}>
                                    <Dropdown overlay={menu(item)}>
                                        <span>
                                            { item[0].path ? (<a href={`/#${item[0].path}`}>{item[0].name}</a>) : item[0].name}<CaretDownOutlined />
                                        </span>
                                    </Dropdown>
                                </Breadcrumb.Item>
                            )
                        } else {
                            return (
                                <Breadcrumb.Item key={item.name}>
                                    { item.path ? (<a href={`/#${item.path}`}>{item.name}</a>) : item.name}
                                </Breadcrumb.Item>
                            )
                        }
                    })
                }
            </Breadcrumb> */}
        </div>
    )
}
export default BreadcrumbCamp
