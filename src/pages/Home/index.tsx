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
import moment from 'moment'
import { Delete } from '@ant-design/icons'
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
                {/* <FormBlock
                    initialValues={{
                        fields2: { a: 555 }, fields3: 777, fields5: [1, 2, 3],
                    }}
                    columnCount={2}
                    labelCol={5 || { span: 4 }} // 支持number类型
                    wrapperCol={{ span: 19 }}
                    getForm={(_form) => { this.form1 = _form }}
                    onFinish={(values) => { console.log(values) }}
                    fields={[
                        {
                            label: '字段1',
                            name: 'fields1',
                            type: 'Input',
                            // rules: [{ required: true }],
                            hidden: (values) => values.fields1 === '777',
                        },
                        {
                            label: '字段2',
                            name: ['fields2', 'a'],
                            type: 'Input',
                            props: { onInput: (value) => { this.form1.setFieldsValue({ fields1: value.target.value }) } },
                        },
                        {
                            label: '字段3',
                            name: 'fields3',
                            render: (value) => value,
                            hidden: (values) => values.fields4 === '2019-01',
                        },
                        {
                            label: '字段4',
                            name: 'fields4',
                            // type: 'MonthPicker',
                            parse: (value) => (value ? moment(value, 'YYYY-MM') : null),
                            format: (momentInstance, dateStr) => dateStr,
                            // normalize: (value, prevValue, prevValues) => { console.log(value); return moment(value, 'YYYY-MM') },
                            // getValueFromEvent: (momentInstance, dateStr) => { console.log(dateStr); return dateStr },
                            render: (value, values, _form) => (
                                <DatePicker.MonthPicker
                                    value={value}
                                    onChange={(m, dateStr) => { _form.setFieldsValue({ fields3: dateStr, fields4: dateStr }) }}
                                />
                            ),
                        },
                        {
                            label: '字段5',
                            name: 'fields5',
                            // renderList: (itemNodes, { fields, add, remove }) => (
                            //     <div>
                            //         {itemNodes}
                            //         <Button onClick={add} type="primary">Add</Button>
                            //     </div>
                            // ),
                            renderListItem: (field, index, { formItemWrapper, add, remove }) => (
                                <Input
                                    allowClear
                                    addonAfter={<Delete onClick={() => { remove(field.name) }} />}
                                />
                            ),
                        },
                        {
                            label: '字段6',
                            name: 'fields6',
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
                            name: 'fields7',
                            parse: (value) => value,
                            format: (event) => { console.log(event.currentTarget.checked); return event.currentTarget.checked },
                            valuePropName: 'checked',
                            validateTrigger: 'onChange',
                            render: () => <input type="checkbox" onChange={(e) => { console.log(e) }} />,
                        },
                    ]}
                >
                    <Button htmlType="submit">submit</Button>
                </FormBlock> */}
                {/* <FormProvider onFinish={(values) => { console.log(values) }} getForm={(func) => { this.form = func }} onFinishFailed={(errorInfo) => { console.log(errorInfo) }}>
                    <FormBlock
                        name="1"
                        initialValues={{ fields2: { a: 555 }, fields3: 777 }}
                        columnCount={2}
                        labelCol={5 || { span: 4 }} // 支持number类型
                        wrapperCol={{ span: 19 }}
                        getForm={(_form) => { this.form1 = _form }}
                        fields={[
                            {
                                label: '字段1',
                                name: 'fields1',
                                type: 'Input',
                                rules: [{ required: true }],
                                hidden: (values) => values.fields1 === '777',
                                // shouldUpdate: true,
                            },
                            {
                                label: '字段2', name: ['fields2', 'a'], type: 'Input', props: { onInput: (value) => { this.form1.setFieldsValue({ fields1: value.target.value }) } },
                            },
                            {
                                label: '字段3',
                                name: 'fields3',
                                render: (value) => <Button onClick={() => { this.hidden = !this.hidden; this.forceUpdate() }}>{value}</Button>,
                            },
                            {
                                label: '字段6',
                                name: 'fields6',
                                render: (value, values, _form) => <DatePicker.MonthPicker onChange={(m, dateStr) => { _form.setFieldsValue({ fields4: dateStr }) }} />,
                            },
                        ]}
                    />
                    <div>Some Element</div>
                    <FormBlock
                        initialValues={{ fields4: '', fields5: 777 }}
                        fields={[
                            { label: '字段4', name: 'fields4', type: 'Text' },
                            {
                                label: '字段5', name: 'fields5', render: (value) => value,
                            },
                        ]}
                        // getForm={(_form) => { this.form2 = _form }}
                    />
                </FormProvider> */}
                <SearchableTable
                    searchURL="/table"
                    rowKey="rowIndex"
                    collapsible
                    visibleFieldsCount={3}
                    initialValues={{ fields1: 11, fields5: '2019-11-22' }}
                    searchFileds={[
                        {
                            label: '字段1',
                            name: 'fields1',
                            type: 'Input',
                        },
                        {
                            label: '字段2',
                            key: 'fields2',
                            transform: (values) => ({
                                fields2: (values || 0) + 666,
                            }),
                            type: 'InputNumber',
                            props: {
                                style: { width: '100%' },
                            },
                        },
                        {
                            label: '字段3',
                            key: 'fields3',
                            transform: (values, key) => ({
                                startTime: values && values[0] && values[0].format('YYYY-MM-DD'),
                                endTime: values && values[1] && values[1].format('YYYY-MM-DD'),
                            }),
                            render: () => <DatePicker.RangePicker />,
                            hidden: (values) => values.fields1 === '111',
                        },
                        {
                            label: '字段4',
                            name: 'fields4',
                            parse: (value) => value && moment(value),
                            format: (momentInstance) => momentInstance && momentInstance.format('YYYY-MM-DD'),
                            render: () => <DatePicker />,
                        },
                        {
                            label: '字段5',
                            key: 'fields5',
                            transform: (value, key) => ({
                                [key + 777]: `${value} 嘎嘎嘎`,
                            }),
                            type: 'DatePicker',
                        },
                        {
                            label: '字段6',
                            name: 'fields6',
                            render: () => <DatePicker />,
                        },
                    ]}
                    columns={[
                        { title: 'rowIndex', dataIndex: 'rowIndex' },
                        { title: 'name', dataIndex: 'name' },
                        { title: 'address', dataIndex: 'address' },
                        { title: 'createTime', dataIndex: 'createTime' },
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
