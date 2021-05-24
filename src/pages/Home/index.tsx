import { DeleteOutlined } from '@ant-design/icons'
import {
    Button, DatePicker, Input,
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import moment from 'moment'
import React, { Component } from 'react'
import SelectSearch from 'src/components/SelectSearch'
import PhotoUpload from 'src/components/PhotoUpload'
import FilesUpload from 'src/components/FilesUpload'
import InputFocus from 'src/components/InputFocus'

class Home extends Component<any, any> {
    form: FormInstance;

    hidden: boolean;

    form2: any

    form1: any

    constructor(props) {
        super(props)
        this.state = {
            optionArr: [
                {
                    customerName: '周杰伦', animalName: '旺财', customerPhone: '15573220014', id: 0,
                },
                {
                    customerName: '林俊杰', animalName: '旺财旺旺', customerPhone: '15500080014', id: 1,
                },
                {
                    customerName: '冯绍峰', animalName: '旺财来了', customerPhone: '18500080099', id: 3,
                },
                {
                    customerName: '蔡依林', animalName: '大黑', customerPhone: '18398650909', id: 4,
                },
                {
                    customerName: '王心凌', animalName: '我家旺财', customerPhone: '13481095658', id: 5,
                },
                {
                    customerName: '赵丽颖', animalName: '财宝', customerPhone: '13481095658', id: 6,
                },
                {
                    customerName: '林心如', animalName: '啦啦啦', customerPhone: '19765908790', id: 7,
                },
                {
                    customerName: '吴亦凡', animalName: '大碗宽面', customerPhone: '19765908790', id: 8,
                },
                {
                    customerName: '田馥甄', animalName: '旺旺', customerPhone: '15590876098', id: 9,
                },
                {
                    customerName: '单依纯', animalName: '就是旺', customerPhone: '1830976912', id: 10,
                },
                {
                    customerName: '张韶涵', animalName: '破茧', customerPhone: '18309098790', id: 11,
                },
            ],
        }
        this.hidden = false
    }

    render() {
        return (
            <div>
                <SelectSearch optionArr={this.state.optionArr} />
                <InputFocus />
                <PhotoUpload
                    action="/upload/file-upload"
                />
                <FilesUpload
                    value={this.state.docsList}
                    onChange={(docsList) => this.setState({ docsList })}
                    action="/upload/file-upload"
                    format={{ name: 'name', url: 'url' }}
                />
            </div>
        )
    }
}

export default Home
