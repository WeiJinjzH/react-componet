import { DeleteOutlined } from '@ant-design/icons'
import {
    Button, DatePicker, Input,
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import moment from 'moment'
import React, { Component } from 'react'
import BreadcrumbCamp from 'src/components/BreadcrumbCamp'

class Home extends Component<any, any> {
    form: FormInstance;

    hidden: boolean;

    form2: any

    form1: any

    constructor(props) {
        super(props)
        this.state = {
            breadcrumbArr: [
                { name: '一级菜单' },
                [
                    { name: '二级菜单1', path: '/echain-list' },
                    { name: '二级菜单2' },
                    { name: '二级菜单3' },
                    { name: '二级菜单4' },
                ],
                { name: '三级菜单', path: '/echain-list' },
                { name: '当前菜单' },
            ]
        }
        this.hidden = false
    }

    render() {
        return (
            <div>
                <BreadcrumbCamp breadcrumbArr={this.state.breadcrumbArr} />
            </div>
        )
    }
}

export default Home
