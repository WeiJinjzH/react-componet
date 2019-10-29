import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import './index.less'

export const SearchBar = ({ fields = [], ...restProps }) => {
    const [form] = Form.useForm()

    const deps = {}

    const updateRenderItems = (values = deps) => {
        Object.keys(values).forEach((key) => {
            deps[key] && deps[key]()
        })
    }

    return (
        <div className="search-bar">
            <Form form={form} layout="inline" onFinish={restProps.onFinish}>
                {
                    fields.map((item) => (
                        <FormItem key={item.name} item={item} form={form} forceUpdateValues={updateRenderItems} deps={deps} />
                    ))
                }
                <Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="reset"
                        onClick={() => {
                            form.resetFields()
                            updateRenderItems()
                        }}
                    >
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

// eslint-disable-next-line object-curly-newline
const FormItem = ({ item, form, forceUpdateValues, deps }) => {
    const [, forceUpdate] = useState()

    const { hidden, ...restProps } = item

    if (hidden) { return null }

    if (typeof item.node === 'function') {
        deps[item.name] = forceUpdate.bind(null, {})
    }

    return (
        <Form.Item {...restProps}>
            {
                typeof item.node === 'function'
                    ? item.node({
                        form,
                        value: form.getFieldValue(item.name),
                        setValue: (value) => {
                            form.setFieldsValue({ [item.name]: value })
                            forceUpdate({})
                        },
                        setValues: (values) => {
                            form.setFieldsValue(values)
                            forceUpdateValues(values)
                        },
                    })
                    : item.node || <Input />
            }
        </Form.Item>
    )
}

export default SearchBar
