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
                { name: '一级菜单', path: '/' },
                [
                    { name: 'E链管理', path: '/' },
                    { name: 'E链管理1' },
                    { name: 'E链管理2' },
                    { name: 'E链管理3' },
                ],
                { name: 'E链列表查询', path: '/echain-list' },
                { name: 'E链详情' },
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
