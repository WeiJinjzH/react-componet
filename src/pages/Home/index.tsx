import {
    Button, Select, InputNumber, Table, Form, Input, Descriptions, Statistic, DatePicker, Avatar, Divider,
} from 'antd'
import React, { Component } from 'react'
import SearchBar from 'src/components/SearchBar'
import { http } from 'utils'
import PreviewImageModal from 'src/components/PreviewImageModal'
import SearchableTable from 'src/components/SearchableTable'
import FormBlock from 'src/components/FormBlock'
import { FormInstance } from 'antd/lib/form'
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons'
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

    componentDidMount() {
        // this.form.setFieldsValue({ startTime: '2019-11-01', endTime: '2019-11-24', aaa: [1, 2] })
        setTimeout(() => {
            console.log(this.form)
            this.form.setFieldsValue({ field1: 111 })
        }, 1000)
    }

    render() {
        return (
            <div>
                <FormBlock
                    initialValues={{
                        field2: { a: 555 }, field3: 777, field5: [1, 2, 3],
                    }}
                    columnCount={2}
                    labelCol={5 || { span: 4 }} // 支持number类型
                    wrapperCol={{ span: 19 }}
                    getForm={(_form) => { this.form = _form }}
                    onFinish={(values) => { console.log(values) }}
                    fields={[
                        {
                            label: '字段1',
                            name: 'field1',
                            type: 'Input',
                            // rules: [{ required: true }],
                            hidden: (values) => values.field1 === '777',
                        },
                        {
                            label: '字段2',
                            name: ['field2', 'a'],
                            type: 'Input',
                            props: { onInput: (value) => { this.form.setFieldsValue({ field1: value.target.value }) } },
                        },
                        {
                            label: '字段3',
                            name: 'field3',
                            render: (value) => value,
                            hidden: (values) => values.field4 === '2019-01',
                        },
                        {
                            label: '字段4',
                            name: 'field4',
                            // type: 'MonthPicker',
                            parse: (value) => (value ? moment(value, 'YYYY-MM') : null),
                            format: (momentInstance, dateStr) => dateStr,
                            // normalize: (value, prevValue, prevValues) => { console.log(value); return moment(value, 'YYYY-MM') },
                            // getValueFromEvent: (momentInstance, dateStr) => { console.log(dateStr); return dateStr },
                            render: (value, values, _form) => (
                                <DatePicker.MonthPicker
                                    value={value}
                                    onChange={(m, dateStr) => { _form.setFieldsValue({ field3: dateStr, field4: dateStr }) }}
                                />
                            ),
                        },
                        {
                            label: '字段5',
                            name: 'field5',
                            // renderList: (itemNodes, { fields, add, remove }) => (
                            //     <div>
                            //         {itemNodes}
                            //         <Button onClick={add} type="primary">Add</Button>
                            //     </div>
                            // ),
                            renderListItem: (field, index, { formItemWrapper, add, remove }) => (
                                <Input
                                    allowClear
                                    addonAfter={<DeleteOutlined onClick={() => { remove(field.name) }} />}
                                />
                            ),
                        },
                        {
                            label: '字段6',
                            name: 'field6',
                            type: 'RadioGroup',
                            props: {
                                options: [
                                    { label: '是', value: 1 },
                                    { label: '否', value: 0 },
                                ],
                            },
                        },
                        {
                            label: '字段7',
                            name: 'field7',
                            parse: (value) => value,
                            format: (event) => { console.log(event.currentTarget.checked); return event.currentTarget.checked },
                            valuePropName: 'checked',
                            validateTrigger: 'onChange',
                            render: () => <input type="checkbox" onChange={(e) => { console.log(e) }} />,
                        },
                    ]}
                >
                    <Button htmlType="submit">submit</Button>
                </FormBlock>
                {/* <FormProvider onFinish={(values) => { console.log(values) }} getForm={(func) => { this.form = func }} onFinishFailed={(errorInfo) => { console.log(errorInfo) }}>
                    <FormBlock
                        name="1"
                        initialValues={{ field2: { a: 555 }, field3: 777 }}
                        columnCount={2}
                        labelCol={5 || { span: 4 }} // 支持number类型
                        wrapperCol={{ span: 19 }}
                        getForm={(_form) => { this.form1 = _form }}
                        fields={[
                            {
                                label: '字段1',
                                name: 'field1',
                                type: 'Input',
                                rules: [{ required: true }],
                                hidden: (values) => values.field1 === '777',
                                // shouldUpdate: true,
                            },
                            {
                                label: '字段2', name: ['field2', 'a'], type: 'Input', props: { onInput: (value) => { this.form1.setFieldsValue({ field1: value.target.value }) } },
                            },
                            {
                                label: '字段3',
                                name: 'field3',
                                render: (value) => <Button onClick={() => { this.hidden = !this.hidden; this.forceUpdate() }}>{value}</Button>,
                            },
                            {
                                label: '字段6',
                                name: 'field6',
                                render: (value, values, _form) => <DatePicker.MonthPicker onChange={(m, dateStr) => { _form.setFieldsValue({ field4: dateStr }) }} />,
                            },
                        ]}
                    />
                    <div>Some Element</div>
                    <FormBlock
                        initialValues={{ field4: '', field5: 777 }}
                        fields={[
                            { label: '字段4', name: 'field4', type: 'Text' },
                            {
                                label: '字段5', name: 'field5', render: (value) => value,
                            },
                        ]}
                        // getForm={(_form) => { this.form2 = _form }}
                    />
                </FormProvider> */}
                {/* <SearchableTable
                    searchURL="/table"
                    collapsible
                    attachSequence
                    onSearch={(values) => { console.log(values) }}
                    getForm={(_form) => { this.form = _form }}
                    visibleFieldsCount={6}
                    initialValues={{
                        field1: 11, field5: '2019-11-22',
                    }}
                    searchFileds={[
                        {
                            label: '字段1',
                            name: 'field1',
                            type: 'Input',
                        },
                        {
                            label: '字段2',
                            name: 'field2',
                            type: 'InputNumber',
                            props: {
                                style: { width: '100%' },
                            },
                        },
                        {
                            key: 'ws1',
                            type: 'WhiteSpace',
                        },
                        {
                            label: '字段3',
                            name: 'Time',
                            type: 'RangePicker',
                            hidden: (values) => values.field1 === '111',
                        },
                        {
                            label: '字段4',
                            name: 'field4',
                            parse: (value) => value && moment(value),
                            format: (momentInstance) => momentInstance && momentInstance.format('YYYY-MM-DD'),
                            render: () => <DatePicker />,
                        },
                        {
                            label: '字段5',
                            name: 'field5',
                            attach: (value, key) => ({
                                [key + 777]: `${value} 嘎嘎嘎`,
                            }),
                            type: 'DatePicker',
                        },
                        {
                            label: '字段6',
                            name: 'field6',
                            type: 'Select',
                            props: {
                                options: [{ label: '111', value: 0 }],
                                style: { width: 100 },
                            },
                            // render: () => <DatePicker />,
                        },
                    ]}
                    columns={[
                        {
                            title: 'name',
                            dataIndex: 'name',
                            render: (value, record) => (
                                <div>
                                    <Avatar style={{ marginRight: 8 }} src={record.avatar} />
                                    {value}
                                </div>
                            ),
                        },
                        { title: 'address', dataIndex: 'address' },
                        { title: 'createTime', dataIndex: 'createTime' },
                    ]}
                /> */}
                {/* <div style={{ backgroundColor: '#fff', padding: 24, marginBottom: 24 }}>
                    <button onClick={() => { this.setState({ href: 'http://localhost:7099/static/assets/logo.png' }) }}>change href</button>
                    <button onClick={() => { this.setState({ visible: true }) }}>change modal</button>
                    <PreviewImageModal visible={this.state.visible} href={this.state.href || 'https://volibearcat.top/static/background.jpg'} onCancel={() => { this.setState({ visible: false }) }} />
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
                            name: 'field1',
                            hidden: this.state.hidden,
                            node: <InputNumber />,
                        },
                        {
                            type: 'Divider',
                        },
                        {
                            label: '字段2',
                            name: 'field2',
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
                            name: 'field3',
                            shouldUpdate: true,
                            node: ({ value, setValues }) => (
                                <Button onClick={() => { setValues({ field1: 666 }) }}>
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
