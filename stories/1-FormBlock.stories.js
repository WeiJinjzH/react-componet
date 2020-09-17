import { Button, Input } from 'antd'
import React from 'react'
import FormBlock from '../src/components/FormBlock'

export default {
    title: 'FormBlock',
    component: FormBlock,
    parameters: {
        componentSubtitle: '集合多项可配置功能属性的表单组件',
    },
}

export const Basic = () => (
    <FormBlock
        onFinish={(values) => { window.console.log(values) }}
        labelCol={4}
        wrapperCol={8}
        fields={[
            {
                label: '字段1',
                name: 'field1',
                type: 'Select',
                props: {
                    options: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                    ],
                },
            },
            { label: '字段2', name: 'field2', type: 'Input' },
            { label: '字段3', name: 'field3', type: 'DatePicker' },
        ]}
    >
        <Button htmlType="submit" type="primary">Submit</Button>
    </FormBlock>
)

export const CustomRender = () => {
    const [result, setResult] = React.useState()
    return (
        <FormBlock
            onFinish={(values) => {
                window.console.log('onFinish', values)
                setResult(values)
            }}
            placeholder={false}
            labelCol={4}
            wrapperCol={8}
            fields={[
                {
                    label: '直接受控组件',
                    name: 'field1',
                    attach: (values, name, fieldsValues) => ({
                        doubleField1: fieldsValues[name] + fieldsValues[name],
                    }),
                    render: function DirectControlled() { return <Input /> },
                },
                {
                    label: '非直接受控组件',
                    name: 'field2',
                    attach: (values, name, fieldsValues) => {
                        delete fieldsValues[name]
                        return ({
                            'field2-A': values?.[0],
                            'field2-B': values?.[1],
                        })
                    },
                    trigger: null, /* important */
                    render: function IndirectControlled([value1, value2] = [], values, form) {
                        return (
                            <div>
                                <Input value={value1} onChange={(e) => { form.setFieldsValue({ field2: [e.target.value, value2] }) }} />
                                <Input value={value2} onChange={(e) => { form.setFieldsValue({ field2: [value1, e.target.value] }) }} />
                            </div>
                        )
                    },
                    lineBreak: true,
                },
                {
                    label: '提示',
                    // name: '无需name',
                    key: 'just_render',
                    render: () => '仅渲染与表单无关联的内容时, 无需name属性, 但key属性必须',
                },
            ]}
        >
            <Button htmlType="submit" type="primary">Submit</Button>
            <div style={{ marginTop: 16, whiteSpace: 'pre-wrap' }}>
                {`values: ${JSON.stringify(result, null, 4)}`}
            </div>
        </FormBlock>
    )
}

export const ReadonlyUsage = () => (
    <FormBlock
        layout="inline"
        columnCount={1}
        compact /* 紧凑模式, 移除字段行间距, 多用于只读表单 */
        getForm={(form) => {
            form.setFieldsValue({
                field1: '文本文本文本文本文本',
                field2: 1000,
                field3: 0.1234,
            })
        }}
        fields={[
            { label: '字段1', name: 'field1', type: 'Text' },
            { label: '字段2', name: 'field2', type: 'Money' },
            { label: '字段3', name: 'field3', type: 'Percent' },
        ]}
    />
)
