import React, { useEffect, useState } from 'react'
import {
    Form, Row, Col, Input, InputNumber, Typography, Select, DatePicker, Radio,
} from 'antd'
import './index.less'

const { MonthPicker } = DatePicker
const { Group: RadioGroup } = Radio

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
    DatePicker,
    // RangePicker,
    MonthPicker,
    // TreeSelect,
    RadioGroup,
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
        layout,
        finishWithHiddenValues = false,
        onFinish,
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
            layout={layout}
            initialValues={initialValues}
            {...restFormProps}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onFinish={(_values) => {
                /* form.getFieldsValue 可获取包含隐藏字段的值 */
                const rawValues = finishWithHiddenValues ? form.getFieldsValue() : _values
                /* 调用"transform"转换输出值 */
                const transformValue = fields.filter((field) => field.transform)
                    .map((field) => field.transform(rawValues[`INTERNAL__${field.key}`]))
                    .reduce((result, value) => ({ ...result, ...value }), {})
                /* 合并转换后的数据 */
                const values = { ...rawValues, ...transformValue }
                /* 过滤"INTERNAL__"标识的字段值 */
                Object.keys(values).forEach((vKey) => {
                    if (vKey.includes('INTERNAL__')) {
                        delete values[vKey]
                    }
                })
                onFinish(values)
            }}
            onValuesChange={(changedValues, values) => {
                if (hasHiddenFunction) {
                    const requireUpdate = fields.filter((item) => typeof item.hidden === 'function')
                        .some((item) => item.hidden(values) !== hiddenStatusCaches[item.name])
                    requireUpdate && update()
                }
            }}
        >
            <Row type="flex" style={{ flexWrap: 'wrap' }} className="items-wrapper">
                {
                    fields.map((field) => {
                        const {
                            key: _key,
                            label,
                            name,
                            transform,
                            type,
                            hidden,
                            render,
                            renderList,
                            renderListItem,
                            props: componentProps,
                            span,
                            parse,
                            format,
                            height = 0,
                            ...restFieldProps
                        } = field
                        let key = _key
                        if (transform && !key) {
                            window.console.warn('使用"transform"时, "key"为必填项.')
                            return (
                                <Typography.Text className="ant-form-text" type="danger">
                                    使用&quot;transform&quot;时, &quot;key&quot;为必填项.
                                </Typography.Text>
                            )
                        }
                        if (transform) {
                            key = `INTERNAL__${_key}`
                        }
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
                            return <div key={key || name} style={{ height, width: '100%', clear: 'both' }} />
                        }
                        const colSpan = span || layout === 'inline' ? undefined : (~~(24 / columnCount) || 24)
                        if (render) {
                            return (
                                <Col key={key || name} span={colSpan}>
                                    <Form.Item
                                        shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                                        {...restFieldProps}
                                        label={label}
                                        name={undefined}
                                    >
                                        {({ getFieldValue, getFieldsValue }) => {
                                            const values = getFieldsValue()
                                            const node = render(getFieldValue(name), values, form)
                                            if (typeof node === 'string' || typeof node === 'number') {
                                                return (
                                                    <Form.Item name={transform ? key : name}>
                                                        <span className="ant-form-text">{node}</span>
                                                    </Form.Item>
                                                )
                                            }
                                            if (parse || format) {
                                                const CompWrapper = function CompWrapper(_props) {
                                                    const Comp = node.type
                                                    const { validateTrigger, valuePropName } = restFieldProps
                                                    const valueKey = valuePropName || 'value'
                                                    const ttiggerKey = validateTrigger || 'onChange'
                                                    return (
                                                        <Comp
                                                            {...node.props}
                                                            {...componentProps}
                                                            {...{
                                                                [ttiggerKey]: (...args) => {
                                                                    if (format) {
                                                                        _props[ttiggerKey](format(...args))
                                                                    } else {
                                                                        _props[ttiggerKey](...args)
                                                                    }
                                                                    node.props
                                                                    && node.props[ttiggerKey]
                                                                    && node.props[ttiggerKey](...args)
                                                                },
                                                                [valueKey]: parse ? parse(_props[valueKey]) : _props[valueKey],
                                                            }}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <Form.Item name={transform ? key : name} {...restFieldProps}>
                                                        <CompWrapper />
                                                    </Form.Item>
                                                )
                                            }
                                            return (
                                                <Form.Item name={transform ? key : name} {...restFieldProps}>
                                                    {node}
                                                </Form.Item>
                                            )
                                        }}
                                    </Form.Item>
                                </Col>
                            )
                        }
                        if (renderList || renderListItem) {
                            return (
                                <Col key={key || name} span={colSpan}>
                                    <Form.Item label={label}>
                                        <Form.List
                                            shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                                            name={transform ? key : name}
                                            {...restFieldProps}
                                        >
                                            {
                                                (_fields, { add, remove }) => {
                                                    const itemNodes = []
                                                    if (renderListItem) {
                                                        _fields.forEach((_field, index) => {
                                                            let usedFormItemWrapper = false
                                                            const formItemWrapper = (_node) => {
                                                                usedFormItemWrapper = true
                                                                return (
                                                                    <Form.Item key={_field.key} {..._field}>
                                                                        { _node }
                                                                    </Form.Item>
                                                                )
                                                            }
                                                            let node = renderListItem(_field, index, {
                                                                formItemWrapper,
                                                                add,
                                                                remove,
                                                                value: form.getFieldValue(name),
                                                                values: form.getFieldsValue(),
                                                                form,
                                                            })
                                                            if (!usedFormItemWrapper) {
                                                                node = (
                                                                    <Form.Item key={_field.key} {..._field}>
                                                                        { node }
                                                                    </Form.Item>
                                                                )
                                                            }
                                                            itemNodes.push(node)
                                                        })
                                                    }
                                                    if (renderList) {
                                                        return renderList(
                                                            itemNodes.length > 0 ? itemNodes : _fields,
                                                            {
                                                                add,
                                                                remove,
                                                                value: form.getFieldValue(name),
                                                                values: form.getFieldsValue(),
                                                                form,
                                                            },
                                                        )
                                                    }
                                                    return <>{itemNodes}</>
                                                }
                                            }
                                        </Form.List>
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
                        if (parse && format) {
                            const CompWrapper = function CompWrapper(_props) {
                                const { validateTrigger, valuePropName } = restFieldProps
                                return (
                                    <Comp
                                        {...{
                                            [validateTrigger || 'onChange']: (...args) => {
                                                _props[validateTrigger || 'onChange'](format(...args))
                                            },
                                            [valuePropName || 'value']: parse(_props[valuePropName || 'value']),
                                        }}
                                        {...componentProps}
                                    />
                                )
                            }
                            return (
                                <Col key={key || name} span={colSpan}>
                                    <Form.Item label={label} name={transform ? key : name} {...restFieldProps}>
                                        <CompWrapper />
                                    </Form.Item>
                                </Col>
                            )
                        }
                        return (
                            <Col key={key || name} span={colSpan}>
                                <Form.Item label={label} name={transform ? key : name} {...restFieldProps}>
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
