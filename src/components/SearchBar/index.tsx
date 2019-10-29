import {
    Button,
    Form,
    Divider,
    Input,
} from 'antd'
import React, { useState } from 'react'
import './index.less'

// eslint-disable-next-line object-curly-newline
export const SearchBar = ({ form: _form = null, fields = [], onReset, ...restProps }) => {
    const [form] = Form.useForm(_form)

    const deps = {}

    const updateRenderItems = (values = deps) => {
        Object.keys(values).forEach((key) => {
            deps[key] && deps[key]()
        })
    }

    if (fields.length === 0) {
        return null
    }

    return (
        <div className="search-bar">
            <Form form={form} layout="inline" {...restProps}>
                {
                    fields.map((item, index) => {
                        if (item.type === 'Divider') {
                            return <Divider key={item.name || `_Divider${index}`} dashed style={{ margin: '8px 0' }} />
                        }
                        return (
                            <FormItem key={item.name} item={item} form={form} updateRenderItems={updateRenderItems} deps={deps} />
                        )
                    })
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
                            onReset && onReset()
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
const FormItem = ({ item, form, updateRenderItems, deps }) => {
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
                            updateRenderItems(values)
                        },
                    })
                    : item.node || <Input />
            }
        </Form.Item>
    )
}

export default SearchBar
