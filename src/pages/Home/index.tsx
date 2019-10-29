import {
    Button, Select, Input, Form, InputNumber, Table,
} from 'antd'
import React, { Component } from 'react'
import SearchBar from 'src/components/SearchBar'
import TextButton from 'src/components/TextButton'
import { http } from 'src/utils'
import PreviewImageModal from 'src/components/PreviewImageModal'
import SearchableTable from 'src/components/SearchableTable'
import style from './index.less'

class Home extends Component<any, any> {
    form = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            href: 'https://volibearcat.top/static/background.jpg', // http://images.mofcom.gov.cn/sczxs/201806/20180622090409090.pdf
        }
    }

    render() {
        return (
            <div>
                <SearchableTable
                    searchURL="/table"
                    initialValues={{ fields1: 11 }}
                    searchFileds={[
                        {
                            label: '字段1',
                            name: 'fields1',
                            hidden: this.state.hidden,
                            node: <InputNumber />,
                        },
                    ]}
                    columns={[
                        { title: 'rowIndex', dataIndex: 'rowIndex' },
                        { title: 'name', dataIndex: 'name' },
                        { title: 'address', dataIndex: 'address' },
                    ]}
                />
                {/* <div style={{ backgroundColor: '#fff', padding: 24, marginBottom: 24 }}>
                    <TextButton className={style.abDdd} onClick={() => { http.get('/form?size=10') }} style={{ color: 'black' }}>测试文本</TextButton>
                    <TextButton canPreview href={this.state.href}>image...</TextButton>
                    <button onClick={() => { this.setState({ href: 'http://localhost:7099/static/assets/logo.png' }) }}>change href</button>
                    <button onClick={() => { this.setState({ visible: true }) }}>change modal</button>
                    <PreviewImageModal visible={this.state.visible} href="https://volibearcat.top/static/background.jpg" onCancel={() => { this.setState({ visible: false }) }} />
                </div> */}
                {/* <SearchBar
                    onFinish={(values) => {
                        http.get('/table').then((res) => {
                            this.setState({ dataSource: res.data.list })
                        })
                        console.log(values)
                    }}
                    fields={[
                        {
                            label: '字段1',
                            name: 'fields1',
                            hidden: this.state.hidden,
                            node: <InputNumber />,
                        },
                        {
                            type: 'Divider',
                        },
                        {
                            label: '字段2',
                            name: 'fields2',
                            shouldUpdate: true,
                            node: (
                                <Select onChange={() => { this.setState({ hidden: false }) }}>
                                    {
                                        [{ label: '选项1', value: 0 }, { label: '选项2', value: 1 }].map(({ label, value }) => (
                                            <Select.Option key={value} value="1">
                                                {label}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            ),
                        },
                        {
                            type: 'Divider',
                        },
                        {
                            label: '字段3',
                            name: 'fields3',
                            shouldUpdate: true,
                            node: ({ value, setValues }) => (
                                <Button onClick={() => { setValues({ fields1: 666 }) }}>
                                    { value || 'button'}
                                </Button>
                            ),
                        },
                    ]}
                />
                <div style={{ backgroundColor: '#fff', padding: 24, marginTop: 24 }}>
                    <Table
                        columns={[
                            { title: 'rowIndex', dataIndex: 'rowIndex' },
                            { title: 'name', dataIndex: 'name' },
                            { title: 'address', dataIndex: 'address' },
                        ]}
                        dataSource={this.state.dataSource}
                    />
                </div> */}
            </div>
        )
    }
}

export default Home
