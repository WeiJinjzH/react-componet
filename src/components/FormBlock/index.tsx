import {
    Col, Form, Row, Typography,
} from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import classNames from 'classnames'
import { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP } from './preset.js'
import './index.less'

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
        compact,
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

    useLayoutEffect(() => {
        getForm && getForm(form)
    }, [getForm, form])

    return (
        <Form
            className={classNames({
                'form-block': true,
                'form-block--compact': compact,
            })}
            form={form}
            layout={layout}
            initialValues={initialValues}
            {...restFormProps}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onFinish={(_values) => {
                /* form.getFieldsValue 可获取包含隐藏字段的值 */
                const rawValues = finishWithHiddenValues ? form.getFieldsValue() : _values
                /* 调用"attach"转换输出值 */
                const attachValue = fields.filter((field) => field.attach)
                    .map((field) => field.attach(rawValues[field.name], field.name, rawValues))
                    .reduce((result, value) => ({ ...result, ...value }), {})
                /* 合并转换后的数据 */
                const values = { ...rawValues, ...attachValue }
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
                    fields.map((rawField) => {
                        let field = rawField
                        /* 预设属性 */
                        if (field.type && PRESET_PROPS_MAP[field.type]) {
                            const { props: presetProps, ..._presetFieldProps } = PRESET_PROPS_MAP[field.type]
                            field = { ..._presetFieldProps, ...field }
                            field.props = { ...presetProps, ...field.props }
                        }
                        const {
                            key,
                            label,
                            name,
                            attach,
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
                        /* prop: attach */
                        if (attach) {
                            rawField.attach = attach
                        }
                        if (attach && !name) {
                            window.console.warn('使用"attach"时, "name"为必填项.')
                            return (
                                <Typography.Text className="ant-form-text" type="danger">
                                    使用&quot;attach&quot;时, &quot;name&quot;为必填项.
                                </Typography.Text>
                            )
                        }
                        /* prop: hidden */
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
                        /* props.type: WhiteSpace */
                        if (type === 'WhiteSpace') {
                            return <div key={key || name} style={{ height, width: '100%', clear: 'both' }} />
                        }
                        /* prop: span, layout, columnCount */
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
                                                    <Form.Item name={name}>
                                                        <span className="ant-form-text">{node}</span>
                                                    </Form.Item>
                                                )
                                            }
                                            if (parse || format) {
                                                const CompWrapper = function CompWrapper(_props) {
                                                    const Comp = node.type
                                                    const { validateTrigger, valuePropName } = restFieldProps
                                                    const valueKey = valuePropName || 'value'
                                                    const triggerKey = validateTrigger || 'onChange'
                                                    return (
                                                        <Comp
                                                            {...node.props}
                                                            {...componentProps}
                                                            {...{
                                                                [triggerKey]: (...args) => {
                                                                    if (format) {
                                                                        _props[triggerKey](format(...args))
                                                                    } else {
                                                                        _props[triggerKey](...args)
                                                                    }
                                                                    node.props
                                                                    && node.props[triggerKey]
                                                                    && node.props[triggerKey](...args)
                                                                },
                                                                [valueKey]: parse ? parse(_props[valueKey]) : _props[valueKey],
                                                            }}
                                                        />
                                                    )
                                                }
                                                return (
                                                    <Form.Item name={name} {...restFieldProps}>
                                                        <CompWrapper />
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
                        if (renderList || renderListItem) {
                            return (
                                <Col key={key || name} span={colSpan}>
                                    <Form.Item label={label}>
                                        <Form.List
                                            shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                                            name={name}
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
                        const Comp = PRESET_FORM_COMPONENT_TYPE[type] || (() => (
                            <Typography.Text
                                className="ant-form-text"
                                type="danger"
                            >
                                {`不支持的组件类型: ${type}`}
                            </Typography.Text>
                        ))
                        if (parse || format) {
                            const CompWrapper = function CompWrapper(_props) {
                                const { validateTrigger, valuePropName } = restFieldProps
                                const valueKey = valuePropName || 'value'
                                const triggerKey = validateTrigger || 'onChange'
                                return (
                                    <Comp
                                        {...{
                                            [triggerKey]: (...args) => {
                                                _props[triggerKey](format(...args))
                                            },
                                            [valueKey]: parse(_props[valueKey]),
                                        }}
                                        {...componentProps}
                                    />
                                )
                            }
                            return (
                                <Col key={key || name} span={colSpan}>
                                    <Form.Item label={label} name={name} {...restFieldProps}>
                                        <CompWrapper />
                                    </Form.Item>
                                </Col>
                            )
                        }
                        return (
                            <Col key={key || name} span={colSpan}>
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
