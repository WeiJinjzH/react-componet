import {
    Button, Select, InputNumber, Table, Form, Input, Descriptions, Statistic, DatePicker,
} from 'antd'
import React, { Component } from 'react'
import SearchBar from 'src/components/SearchBar'
import TextButton from 'src/components/TextButton'
import { http } from 'utils'
import PreviewImageModal from 'src/components/PreviewImageModal'
import SearchableTable from 'src/components/SearchableTable'
import FormBlock from 'src/components/FormBlock'
import { FormInstance } from 'antd/lib/form'
import FormProvider from 'src/components/FormProvider'
import style from './index.less'

class Home extends Component<any, any> {
    form: FormInstance;

    hidden: boolean;

    form2: any

    form1: any

    constructor(props) {
        super(props)
        this.state = {
            href: 'https://volibearcat.top/static/background.jpg', // http://images.mofcom.gov.cn/sczxs/201806/20180622090409090.pdf
        }
        this.hidden = false
    }


    render() {
        return (
            <div>
                <FormProvider onFinish={(values) => { console.log(values) }} getForm={(func) => { this.form = func }} onFinishFailed={(errorInfo) => { console.log(errorInfo) }}>
                    {
                        (form) => (
                            <>
                                <FormBlock
                                    form={form} // 可选
                                    initialValues={{ fields2: { a: 555 }, fields3: 777 }}
                                    columnCount={2}
                                    labelCol={5 || { span: 4 }} // 支持number类型
                                    wrapperCol={{ span: 19 }}
                                    // getForm={(_form) => { this.form1 = _form }}
                                    fields={[
                                        {
                                            label: '字段1',
                                            name: 'fields1',
                                            type: 'Input',
                                            rules: [{ required: true }],
                                        },
                                        {
                                            label: '字段2', name: ['fields2', 'a'], type: 'Input', props: { onChange: (value) => { form.setFieldsValue({ fields5: value.target.value }) } },
                                        },
                                        {
                                            label: '字段3',
                                            name: 'fields3',
                                            render: (value) => <Button onClick={() => { this.hidden = !this.hidden; this.forceUpdate() }}>{value}</Button>,
                                        },
                                        {
                                            label: '字段6',
                                            name: 'fields6',
                                            render: (value, values, _form) => <DatePicker.MonthPicker onChange={(m, dateStr) => { _form.setFieldsValue({ fields6: dateStr }) }} />,
                                        },
                                    ]}
                                />
                                <div>Some Element</div>
                                <FormBlock
                                    form={form} // 可选
                                    initialValues={{ fields4: '', fields5: 777 }}
                                    fields={[
                                        { label: '字段4', name: 'fields4', type: 'Text' },
                                        {
                                            label: '字段5', name: 'fields5', render: (value) => value,
                                        },
                                    ]}
                                    // getForm={(_form) => { this.form2 = _form }}
                                />
                            </>
                        )
                    }
                </FormProvider>
                <button onClick={() => { this.form.submit() }}>submit</button>
                {/* <SearchableTable
                    searchURL="/table"
                    rowKey="rowIndex"
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
                        { title: 'createTime', dataIndex: 'createTime' },
                    ]}
                /> */}
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
