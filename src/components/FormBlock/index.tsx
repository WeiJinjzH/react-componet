import React, { useEffect, useState } from 'react'
import {
    Form, Row, Col, Input, InputNumber, Typography,
} from 'antd'
import './index.less'

function getValue(data, namePath) {
    const name = namePath[0]
    const restNamePath = namePath.slice(1)
    if (restNamePath.length) {
        if (data[name]) {
            return getValue(data[name], restNamePath)
        }
        return undefined
    }
    return data[name]
}

const Text = (props) => {
    const onChange = (props.editable && props.editable.onChange) || ((str) => {
        props.onChange && props.onChange(str)
    })
    const editable = {
        onChange,
    }
    return (
        <Typography.Text
            className="ant-form-text"
            editable={props.editable && editable}
        >
            {props.value || (props.value === 0 ? 0 : props.editable ? <span style={{ marginRight: -8 }} /> : '-')}
        </Typography.Text>
    )
}

const FORM_ITEM_TYPE = {
    Input,
    InputNumber,
    // InputSearch,
    // Select,
    // XzSelect,
    // DatePicker,
    // RangePicker,
    // MonthPicker,
    // TreeSelect,
    // RadioGroup,
    // Cascader,
    // Checkbox,
    // CheckboxGroup,
    // InputGroup,
    // TimePicker,
    // TextArea,
    // CustomItem,
    Text,
    // FilesUpload,
    // PhotoUpload,
    // MultiPhotoUpload,
}

const FormBlock = (props) => {
    const {
        getForm, columnCount, fields = [], initialValues,
    } = props
    let { labelCol, wrapperCol } = props
    let hasHiddenItem = false

    const [, _update] = useState()
    const update = _update.bind(null, {})

    const [form] = Form.useForm()

    if (typeof labelCol === 'number') {
        labelCol = { span: labelCol }
    }
    if (typeof wrapperCol === 'number') {
        wrapperCol = { span: wrapperCol }
    }

    useEffect(() => {
        getForm && getForm(form)
    }, [getForm, form, columnCount, fields, initialValues])

    return (
        <Form
            className="form-block"
            form={form}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            initialValues={initialValues}
            onFieldsChange={() => {
                if (hasHiddenItem) {
                    update()
                }
            }}
        >
            <Row type="flex" style={{ flexWrap: 'wrap' }}>
                {
                    fields.map((item) => {
                        if ('hidden' in item) {
                            hasHiddenItem = true
                        }
                        if (typeof item.hidden === 'function') {
                            const hidden = item.hidden({ ...initialValues, ...form.getFieldsValue() })
                            if (hidden) {
                                return null
                            }
                        } else if (item.hidden) {
                            return null
                        }
                        if (item.type === 'WhiteSpace') {
                            return <div key={item.name} style={{ height: item.height || 0, width: '100%', clear: 'both' }} />
                        }
                        if (item.render) {
                            return (
                                <Col key={item.name} span={item.colSpan || ~~(24 / columnCount) || 24}>
                                    <Form.Item label={item.label} shouldUpdate>
                                        {() => {
                                            const values = form.getFieldsValue()
                                            const node = item.render(getValue(values, [item.name]), values, form)
                                            if (typeof node === 'string' || typeof node === 'number') {
                                                return <span className="ant-form-text">{node}</span>
                                            }
                                            return node
                                        }}
                                    </Form.Item>
                                </Col>
                            )
                        }
                        const Comp = FORM_ITEM_TYPE[item.type] || <div>不支持的组件类型</div>
                        return (
                            <Col key={item.name} span={item.colSpan || ~~(24 / columnCount) || 24}>
                                <Form.Item label={item.label} name={item.name}>
                                    <Comp {...item.props} />
                                </Form.Item>
                            </Col>
                        )
                    })
                }
            </Row>
        </Form>
    )
}

export default FormBlock
