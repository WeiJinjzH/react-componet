import {
    Button, Divider, Form, Input,
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { useState } from 'react'
import './index.less'
import { FormProps } from 'rc-field-form/lib/Form'

interface SearchBarProps extends FormProps {
    form?: FormInstance;
    fields: any[];
    onSearch?: (values?: any) => void;
    onReset?: (values?: any) => void;
}

// eslint-disable-next-line object-curly-newline
export const SearchBar = ({ form: _form, fields = [], onSearch, onReset, children, ...restProps }: SearchBarProps) => {
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
        <div className="search-bar" style={{ marginBottom: children ? 0 : 24 }}>
            <Form form={form} layout="inline" onFinish={onSearch} {...restProps}>
                {
                    fields.map((item, index) => {
                        if (item.type === 'Divider') {
                            return <Divider key={String(item.name) || `_Divider${index}`} dashed style={{ margin: '8px 0' }} />
                        }
                        return (
                            <FormItem key={String(item.name)} item={item} form={form} updateRenderItems={updateRenderItems} deps={deps} />
                        )
                    })
                }
                <Form.Item>
                    <Button htmlType="submit" type="primary">查询</Button>
                </Form.Item>
                {
                    onReset ? (
                        <Form.Item>
                            <Button
                                htmlType="reset"
                                onClick={() => {
                                    form.resetFields()
                                    updateRenderItems()
                                    onReset()
                                }}
                            >
                                重置
                            </Button>
                        </Form.Item>
                    ) : null
                }
            </Form>
            <div style={{ marginTop: 24, marginBottom: -24 }}>
                { children }
            </div>
        </div>
    )
}

// eslint-disable-next-line object-curly-newline
const FormItem = ({ item, form, updateRenderItems, deps }) => {
    const [, forceUpdate] = useState()

    const { hidden, ...restProps } = item

    if (hidden) { return null }

    if (typeof item.node === 'function') {
        deps[String(item.name)] = forceUpdate.bind(null, {})
    }

    return (
        <Form.Item {...restProps}>
            {
                typeof item.node === 'function'
                    ? item.node({
                        form,
                        value: form.getFieldValue(item.name),
                        setValue: (value) => {
                            form.setFieldsValue({ [String(item.name)]: value })
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
