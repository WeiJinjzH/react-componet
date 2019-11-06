import React, { useEffect, useState } from 'react'
import {
    Form, Row, Col, Input, InputNumber, Typography, Select, DatePicker,
} from 'antd'
import './index.less'

import { FormContext } from '../FormProvider'

const { MonthPicker } = DatePicker

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
        onFinish,
        onFinishFailed,
        onFormFinish,
        onFormFinishFailed,
        addValuesChangeListener,
        onFormValuesChange,
        ...restFormProps
    } = props
    let { labelCol, wrapperCol } = props
    let hasHiddenFunction = false

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
        const onValuesChange = () => {
            if (hasHiddenFunction) {
                update()
            }
        }
        addValuesChangeListener && addValuesChangeListener(onValuesChange)
        getForm && getForm(form)
    }, [getForm, form, addValuesChangeListener, hasHiddenFunction, update])

    return (
        <Form
            className="form-block"
            form={form}
            initialValues={initialValues}
            {...restFormProps}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onValuesChange={(values) => {
                if (addValuesChangeListener) {
                    onFormValuesChange(values)
                } else if (hasHiddenFunction) {
                    update()
                }
            }}
            onFinish={(values) => {
                onFormFinish && onFormFinish()
                onFinish && onFinish(values)
            }}
            onFinishFailed={(errorInfo) => {
                onFormFinishFailed && onFormFinishFailed(errorInfo)
                onFinishFailed && onFinishFailed(errorInfo)
            }}
        >
            <Row type="flex" style={{ flexWrap: 'wrap' }}>
                {
                    fields.map((field) => {
                        const {
                            name, type, hidden, render, props: componentProps, span, height = 0, ...restFieldProps
                        } = field
                        if (typeof hidden === 'function') {
                            hasHiddenFunction = true
                            const isHidden = hidden({ ...initialValues, ...form.getFieldsValue() })
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
                                        name={undefined}
                                    >
                                        {() => {
                                            const values = form.getFieldsValue()
                                            const node = render(getValue(values, [name]), values, form)
                                            if (typeof node === 'string' || typeof node === 'number') {
                                                return <span className="ant-form-text">{node}</span>
                                            }
                                            return node
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
                                <Form.Item name={name} {...restFieldProps}>
                                    <Comp {...componentProps} />
                                </Form.Item>
                            </Col>
                        )
                    })
                }
            </Row>
        </Form>
    )
}

const FormBlockWraper = (props) => (
    <FormContext.Consumer>
        {({
            form, onFormFinish, onFormFinishFailed, onFormValuesChange, addValuesChangeListener,
        }) => (
            <FormBlock
                form={form}
                onFormFinish={onFormFinish}
                onFormFinishFailed={onFormFinishFailed}
                addValuesChangeListener={addValuesChangeListener}
                onFormValuesChange={onFormValuesChange}
                {...props}
            />
        )}
    </FormContext.Consumer>
)

export default FormBlockWraper
