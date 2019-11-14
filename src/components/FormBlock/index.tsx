import React, { useEffect, useState } from 'react'
import {
    Form, Row, Col, Input, InputNumber, Typography, Select, DatePicker,
} from 'antd'
import './index.less'

const { MonthPicker } = DatePicker

const Text = (props) => {
    const onChange = (props.editable && props.editable.onChange) || ((str) => {
        props.onChange && props.onChange(str)
    })
    const editable = {
        onChange,
    }
    if (props.value !== null && !['number', 'undefined', 'string'].includes(typeof props.value)) {
        return <Typography.Text className="ant-form-text" type="danger">{`数据类型错误, 类型不能是"${typeof props.value}"`}</Typography.Text>
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
    Select,
    // XzSelect,
    DatePicker,
    // RangePicker,
    MonthPicker,
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
        getForm,
        columnCount,
        fields = [],
        initialValues,
        form: _form,
        children,
        ...restFormProps
    } = props
    let { labelCol, wrapperCol } = props
    let hasHiddenFunction = false
    const hiddenStatusCaches = {}

    const [, _update] = useState()
    const update = _update.bind(null, {})

    const [form] = Form.useForm(_form)

    if (typeof labelCol === 'number') {
        labelCol = { span: labelCol }
    }
    if (typeof wrapperCol === 'number') {
        wrapperCol = { span: wrapperCol }
    }

    useEffect(() => {
        getForm && getForm(form)
    }, [getForm, form])

    return (
        <Form
            className="form-block"
            form={form}
            initialValues={initialValues}
            {...restFormProps}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onValuesChange={(changedValues, values) => {
                if (hasHiddenFunction) {
                    const requireUpdate = fields.filter((item) => typeof item.hidden === 'function')
                        .some((item) => item.hidden(values) !== hiddenStatusCaches[item.name])
                    requireUpdate && update()
                }
            }}
        >
            <Row type="flex" style={{ flexWrap: 'wrap' }}>
                {
                    fields.map((field) => {
                        const {
                            label, name, type, hidden, render, props: componentProps, span, height = 0, ...restFieldProps
                        } = field
                        if (typeof hidden === 'function') {
                            hasHiddenFunction = true
                            const isHidden = hidden({ ...initialValues, ...form.getFieldsValue() })
                            hiddenStatusCaches[name] = isHidden
                            if (isHidden) {
                                return null
                            }
                        } else if (hidden) {
                            return null
                        }
                        if (type === 'WhiteSpace') {
                            return <div key={name} style={{ height, width: '100%', clear: 'both' }} />
                        }
                        if (render) {
                            return (
                                <Col key={name} span={span || ~~(24 / columnCount) || 24}>
                                    <Form.Item
                                        shouldUpdate={({ [name]: prevValue }, { [name]: nextValue }) => prevValue !== nextValue}
                                        {...restFieldProps}
                                        label={label}
                                        name={undefined}
                                    >
                                        {({ getFieldValue, getFieldsValue }) => {
                                            const values = getFieldsValue()
                                            const node = render(getFieldValue(name), values, form)
                                            if (typeof node === 'string' || typeof node === 'number') {
                                                return (
                                                    <Form.Item name={name}>
                                                        <span className="ant-form-text">{node}</span>
                                                    </Form.Item>
                                                )
                                            }
                                            return (
                                                <Form.Item name={name} {...restFieldProps}>
                                                    {node}
                                                </Form.Item>
                                            )
                                        }}
                                    </Form.Item>
                                </Col>
                            )
                        }
                        const Comp = FORM_ITEM_TYPE[type] || (() => (
                            <Typography.Text
                                className="ant-form-text"
                                type="danger"
                            >
                                {`不支持的组件类型: ${type}`}
                            </Typography.Text>
                        ))
                        return (
                            <Col key={name} span={span || ~~(24 / columnCount) || 24}>
                                <Form.Item label={label} name={name} {...restFieldProps}>
                                    <Comp {...componentProps} />
                                </Form.Item>
                            </Col>
                        )
                    })
                }
            </Row>
            {children}
        </Form>
    )
}

export default FormBlock
