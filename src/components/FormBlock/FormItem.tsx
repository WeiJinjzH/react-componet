import { Col, Form, Typography } from 'antd'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { FormBlockProps, IProxyFormInstance } from './index.js'
import { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP } from './preset.js'

interface IFormItem {
    field: {
        [key: string]: any;
    },
    formProps?: FormBlockProps,
    form: IProxyFormInstance,
}

/** 更新单个表单项 */
const ObservedFormItem = ({
    children,
    getUpdater,
}) => {
    const [, _update] = useState({})
    useEffect(() => {
        getUpdater(() => { _update({}) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return children()
}

const FormItem = (props: IFormItem) => {
    const { form } = props
    const { updaterMap, hiddenStatusCaches } = form

    const {
        initialValues,
        span: golbalSpan,
        layout,
        labelCol: globalLabelCol,
        wrapperCol: globalWrapperCol,
        minWidth: globalMinWidth,
        maxWidth: globalMaxWidth,
        width: golbalWidth,
        placeholder: globalPlaceholder = ({ label, type }) => (type?.includes('Select') ? '请选择' : `请输入${label || ''}`),
    } = props.formProps

    let { field } = props
    /* 预设属性 */
    let presetProps = PRESET_PROPS_MAP[field.type]
    if (field.type && presetProps) {
        presetProps = typeof presetProps === 'function' ? presetProps(field, form) : presetProps
        const { props: presetComponentProps, ..._presetFieldProps } = presetProps
        field = { ..._presetFieldProps, ...field }
        field.props = { ...presetComponentProps, ...field.props }
    }
    const {
        key,
        name,
        label,
        type,
        span = golbalSpan,
        hidden,
        colProps,
        minWidth = globalMinWidth,
        maxWidth = globalMaxWidth,
        width = golbalWidth,
        props: componentProps = {},
        lineBreak,
        extra: _extra,
        before: _before,
        after: _after,
        compact,
        parse,
        format,
        height = 0,
        render,
        help,
        forceRender,
        validateStatus,
        renderList,
        renderListItem,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        /** DOM属性过滤-start */
        attach,
        /** DOM属性过滤-end */
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...restFieldProps
    } = field

    let {
        labelCol = globalLabelCol,
        wrapperCol = globalWrapperCol,
    } = props.field

    /* 非inline模式下, 为labelCol、wrapperCol赋默认值 */
    if (layout !== 'inline' && layout !== 'vertical' && typeof labelCol === 'undefined') {
        labelCol = { span: 8 }
    }
    if (layout !== 'inline' && layout !== 'vertical' && typeof wrapperCol === 'undefined') {
        wrapperCol = { span: 16 }
    }

    /* labelCol、wrapperCol 兼容 number类型数值 */
    if (typeof labelCol === 'number') {
        labelCol = { span: labelCol }
    }
    if (typeof wrapperCol === 'number') {
        wrapperCol = { span: wrapperCol }
    }

    /* layout === "inline" 且 span 有值时, 需要额外填充满表单项宽度 */
    const requiredFillWidth = layout === 'inline' && span
    /* prop: span, layout */
    const colSpan = span ?? (layout === 'inline' ? undefined : 24)

    if (!('placeholder' in componentProps) && globalPlaceholder) {
        let placeholderContent = globalPlaceholder
        if (typeof globalPlaceholder === 'function') {
            placeholderContent = globalPlaceholder(field, form)
        }
        componentProps.placeholder = placeholderContent
    }

    /* prop: hidden */
    let isHidden = hidden
    if (typeof hidden === 'function') {
        // hasHiddenFunction = true
        const values = form.getFieldsValue()
        isHidden = !!hidden({ ...initialValues, ...values })
        hiddenStatusCaches[key || name] = isHidden
    }
    if (isHidden) {
        return name ? (
            <Form.Item
                key={key || name}
                name={name}
                {...restFieldProps}
                hidden
                rules={undefined}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                noStyle
            >
                <span key={key || name} style={{ display: 'none' }} />
            </Form.Item>
        ) : null
    }
    /** 拓展FormItem属性支持 */
    const enhanceFormItemPorps = () => {
        /* 表单所有字段值 */
        const values = { ...initialValues, ...form.getFieldsValue() }
        /* 表单项当前字段值 */
        const value = name ? form.getFieldValue(name) : undefined
        /* 拓展extra属性支持函数调用 */
        let extra = _extra
        if (typeof extra === 'function') {
            extra = extra(value, values, form)
        }
        let before = _before
        if (typeof before === 'function') {
            before = before(value, values, form)
        }
        let after = _after
        if (typeof after === 'function') {
            after = after(value, values, form)
        }
        return {
            extra, before, after,
        }
    }

    const getUpdater = (updater) => {
        if (typeof _before === 'function' || typeof _after === 'function' || typeof _extra === 'function') {
            updaterMap[key || name] = updater
        }
    }
    /* props.type: WhiteSpace */
    if (type === 'WhiteSpace') {
        return <div key={key} style={{ height, width: '100%', clear: 'both' }} />
    }
    let FormItemComponent

    if (render) {
        FormItemComponent = function RenderFormItemComponent() {
            const { extra, before, after } = enhanceFormItemPorps()
            return (
                <Form.Item
                    shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                    label={label}
                    name={undefined}
                    {...restFieldProps}
                    extra={extra}
                    help={help}
                    validateStatus={validateStatus}
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    className={classNames({
                        'ant-form-item--compact': compact,
                        'ant-form-item--fill-width': requiredFillWidth,
                    })}
                >
                    {() => {
                        /* 表单所有字段值 */
                        const values = { ...initialValues, ...form.getFieldsValue() }
                        /* 表单项当前字段值 */
                        const value = name ? form.getFieldValue(name) : undefined
                        let node = render(value, values, form)
                        if (node === null
                            || typeof node === 'string'
                            || typeof node === 'number'
                            || typeof node === 'undefined'
                            || typeof node === 'boolean'
                            || Array.isArray(node)) {
                            node = <span>{node}</span>
                        }
                        if (parse || format) {
                            if (!name) { // TODO: 改用typescript类型控制 替换此处代码
                                const warningText = '使用"parse"或"format"时, "name"为必填项.'
                                window.console.error(`Warning: ${warningText}`)
                                return (
                                    <Typography.Text className="ant-form-text" type="danger">
                                        {warningText}
                                    </Typography.Text>
                                )
                            }
                            if (forceRender || !form.cacheComponentMap.has(field.name)) {
                                const tempNode = node
                                // eslint-disable-next-line no-unused-vars
                                const CompWrapper = React.forwardRef((_props, _ref) => {
                                    const { validateTrigger, valuePropName } = restFieldProps
                                    const valueKey = valuePropName || 'value'
                                    const triggerKey = validateTrigger || 'onChange'
                                    const cloneNode = React.cloneElement(tempNode, {
                                        ...componentProps,
                                        [triggerKey]: (..._args) => {
                                            let args = _args
                                            if (format) {
                                                const [_value, ...restArgs] = args
                                                args = [format(_value), ...restArgs]
                                            }
                                            _props[triggerKey](...args)
                                            tempNode?.props?.[triggerKey]?.(...args)
                                            componentProps?.[triggerKey]?.(...args)
                                        },
                                        [valueKey]: parse ? parse(_props[valueKey]) : _props[valueKey],
                                    })
                                    return cloneNode
                                })
                                form.cacheComponentMap.set(name, <CompWrapper {...tempNode.props} />)
                            }
                            node = form.cacheComponentMap.get(name)
                        }
                        node = React.cloneElement(node, { ...componentProps })
                        return (
                            <>
                                {before}
                                <Form.Item name={name} noStyle>
                                    {node}
                                </Form.Item>
                                {after}
                            </>
                        )
                    }}
                </Form.Item>
            )
        }
    } else if (renderList || renderListItem) {
        FormItemComponent = () => {
            /* 表单所有字段值 */
            const values = { ...initialValues, ...form.getFieldsValue() }
            /* 表单项当前字段值 */
            const value = name ? form.getFieldValue(name) : undefined
            /* 拓展extra属性支持函数调用 */
            let extra = _extra
            if (typeof extra === 'function') {
                extra = extra(value, values, form)
            }
            return (
                <Form.Item
                    // shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                    label={label}
                    name={undefined}
                    {...restFieldProps}
                    extra={extra}
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    className={classNames({
                        'ant-form-item--compact': compact,
                        'ant-form-item--fill-width': requiredFillWidth,
                    })}
                >
                    <Form.List
                        name={name}
                        {...restFieldProps}
                    >
                        {
                            (_fields, { add, remove, move }) => {
                                const itemNodes = []
                                if (renderListItem) {
                                    _fields.forEach((_field, index) => {
                                        let usedFormItemWrapper = false
                                        const formItemWrapper = (_node) => {
                                            usedFormItemWrapper = true
                                            return (
                                                <Form.Item key={_field.key} {..._field}>
                                                    {_node}
                                                </Form.Item>
                                            )
                                        }
                                        let node = renderListItem(_field, index, {
                                            formItemWrapper,
                                            add,
                                            remove,
                                            move,
                                            value: form.getFieldValue(name),
                                            values: form.getFieldsValue(),
                                            form,
                                        })
                                        if (!usedFormItemWrapper) {
                                            node = (
                                                <Form.Item key={_field.key} {..._field}>
                                                    {node}
                                                </Form.Item>
                                            )
                                        }
                                        itemNodes.push(node)
                                    })
                                }
                                if (renderList) {
                                    return renderList(
                                        itemNodes,
                                        {
                                            add,
                                            remove,
                                            move,
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
            )
        }
    } else {
        let PresetComponent = PRESET_FORM_COMPONENT_TYPE[type] || (function WarningText() {
            return (
                <Typography.Text
                    className="ant-form-text"
                    type="danger"
                >
                    {`不支持的组件类型: ${type}`}
                </Typography.Text>
            )
        })
        if (parse || format) {
            const TempPresetComponent = PresetComponent
            PresetComponent = function CompWrapper(_props) {
                const { validateTrigger, valuePropName } = restFieldProps
                const valueKey = valuePropName || 'value'
                const triggerKey = validateTrigger || 'onChange'
                return (
                    <TempPresetComponent
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
        }
        FormItemComponent = function PresetFormItemComponent() {
            const { extra, before, after } = enhanceFormItemPorps()
            return (
                <Form.Item
                    label={label}
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    {...restFieldProps}
                    extra={extra}
                >
                    {before}
                    <Form.Item name={name} noStyle {...restFieldProps}>
                        <PresetComponent {...componentProps} />
                    </Form.Item>
                    {after}
                </Form.Item>
            )
        }
    }
    return (
        <React.Fragment key={key || name}>
            <Col
                span={colSpan}
                {...colProps}
                style={{
                    minWidth, maxWidth, width, ...colProps?.style,
                }}
                className={classNames({
                    'ant-form-item--compact': compact,
                    'ant-form-item--fill-width': requiredFillWidth,
                    [colProps?.className]: !!colProps?.className,
                })}
            >
                <ObservedFormItem getUpdater={getUpdater}>
                    {FormItemComponent}
                </ObservedFormItem>
            </Col>
            {!!lineBreak && <div className="form-block--line-break" />}
        </React.Fragment>
    )
}

export default FormItem
