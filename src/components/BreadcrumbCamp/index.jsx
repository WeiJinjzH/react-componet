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
            <Breadcrumb separator=">">
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
            </Breadcrumb>
        </div>
    )
}
export default BreadcrumbCamp
