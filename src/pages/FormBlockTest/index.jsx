import React, { Component } from 'react'
import FormBlock from 'src/components/FormBlock'
import { Button, Input } from 'antd'

export default class FormBlockTest extends Component {
    render() {
        return (
            <FormBlock
                layout="horizontal"
                onFinish={(values) => { window.console.log(values) }}
                getForm={(form) => { this.form = form }}
                span={8}
                initialValues={{ field1: '123', field3: '456789' }}
                fields={[
                    {
                        label: '字段1',
                        name: 'field1',
                        type: 'Input',
                        rules: [{ required: true }],
                        hidden: () => this.form?.getFieldValue('field2'),
                    },
                    {
                        label: '字段2', name: 'field2', type: 'Input', extra: 123,
                    },
                    { label: '字段3', name: 'field3', type: 'Input' },
                    { label: '字段4', name: 'field4', type: 'DatePicker' },
                    { label: '字段5', name: 'field5', type: 'Input' },
                    { label: '字段6', name: 'field6', type: 'Input' },
                    { label: '字段7', name: 'field7', type: 'Input' },
                    { label: '字段8', name: 'field8', type: 'Input' },
                    { label: '字段9', name: 'field9', type: 'Input' },
                    {
                        label: '字段10',
                        name: 'field10',
                        render: () => <Input />,
                        extra: (v, vs) => v + vs.field3,
                        shouldUpdate: true,
                        before: (v, vs) => v + vs.field3,
                        after: (v, vs) => v + vs.field3,
                        lineBreak: true,
                    },
                    {
                        label: '字段11', name: 'field11', render: () => 'field11', after: (v, vs) => v + vs.field10,
                    },
                    { label: '字段12', name: 'field12', render: () => 'field12' },
                    { label: '字段13', name: 'field13', render: () => 'field13' },
                ]}
            >
                <Button htmlType="submit">提交</Button>
            </FormBlock>
        )
    }
}
