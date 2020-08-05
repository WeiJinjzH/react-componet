import {
    Col, Form, Row, Typography,
} from 'antd'
import React, { useLayoutEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP } from './preset.js'
import './index.less'

const FormBlock = (props) => {
    const {
        form: _form,
        /* 回调获取表单实例 FormInstance */
        getForm,
        /* 字段配置 */
        fields = [],
        /* 紧凑模式 */
        compact,
        /* 布局划分: 纵向数列数量 */
        columnCount,
        /* 表单提交时的回调 function(values, formInstance) */
        onFinish,
        /* 初始值 */
        initialValues,
        /* 全局配置表单项span属性 */
        span: _span,
        className,
        layout,
        children,
        onSubmit,
        onFinishFailed,
        minWidth: _minWidth,
        maxWidth: _maxWidth,
        width: _width,
        colon: _colon,
        onValuesChange,
        ...restFormProps
    } = props

    const [form] = Form.useForm(_form)

    let hasHiddenFunction = false // TODO: onValuesChange方法性能优化使用, 待定

    const [, _update] = useState()
    const update = _update.bind(null, {})

    /* labelCol、wrapperCol配置表单默认 字段名及内容 栅格比例 */
    let { labelCol, wrapperCol } = props
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

    const ref = useRef({ hiddenStatusCaches: {} })

    const { hiddenStatusCaches } = ref.current

    const getAttachValues = (values) => fields.filter((field) => field.attach && !hiddenStatusCaches[field.name])
        .map((field) => field.attach(values[field.name], field.name, values))
        .reduce((result, value) => ({ ...result, ...value }), {})

    useLayoutEffect(() => {
        getForm && getForm(form)
    }, [form, getForm])

    return (
        <Form
            className={classNames({
                'form-block': true,
                'form-block--compact': compact,
                [className]: !!className,
            })}
            form={form}
            layout={layout}
            initialValues={initialValues}
            {...restFormProps}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onFinish={(values) => {
                if (onFinish) {
                    /* 调用"attach"转换输出值 */
                    const attachValue = getAttachValues(values)
                    /* 合并转换后的数据 */
                    onFinish({ ...values, ...attachValue }, form)
                }
            }}
            onValuesChange={(changedValues, values) => {
                if (hasHiddenFunction) {
                    const requireUpdate = fields.filter((item) => typeof item.hidden === 'function')
                        .some((item) => item.hidden(values) !== hiddenStatusCaches[item.name || item.key])
                    requireUpdate && update()
                }
                onValuesChange && onValuesChange(changedValues, form.getFieldsValue())
            }}
        >
            <Row className="items-wrapper">
                {
                    fields.map((originalField) => {
                        let field = originalField
                        /* 预设属性 */
                        if (field.type && PRESET_PROPS_MAP[field.type]) {
                            if (typeof PRESET_PROPS_MAP[field.type] === 'function') {
                                const { props: presetComponentProps, ..._presetFieldProps } = PRESET_PROPS_MAP[field.type](field, form)
                                field = { ..._presetFieldProps, ...field }
                                field.props = { ...presetComponentProps, ...field.props }
                            } else {
                                const { props: presetComponentProps, ..._presetFieldProps } = PRESET_PROPS_MAP[field.type]
                                field = { ..._presetFieldProps, ...field }
                                field.props = { ...presetComponentProps, ...field.props }
                            }
                        }
                        const {
                            label,
                            key, // 仅作为key使用, 不再为name赋值
                            name, // 未使用name的字段, 不在表单实例控制内
                            render,
                            span = _span, // 布局划分: 配置当前字段占用栅格数
                            minWidth = _minWidth,
                            maxWidth = _maxWidth,
                            width = _width,
                            compact: formItemCompact, // 控制表单项是否表现为紧凑模式
                            props: componentProps = {}, // 组件属性
                            height = 0, // 仅 type: WhiteSpace 时有效, 控制间隔高度
                            lineBreak, // 换行, 在表单项结尾处插入换行元素
                            attach, // 在表单提交触发, 通过当前字段, 转换成新的数据字段附加在 onFinish 回调的数据内
                            type, // 可选值: WhiteSpace、 PRESET_FORM_COMPONENT_TYPE 内的预设组件
                            extra: _extra,
                            help: _help,
                            validateStatus: _validateStatus,
                            colon = _colon,
                            before: _before, // 于表单项组件前插入内容
                            after: _after, // 于表单项组件后插入内容

                            /*
                                hidden: 控制字段是否隐藏;
                                如表单联动, 动态控制是否隐藏时使用函数方式回调布尔值:  hidden: (values) => true
                                如在组件挂载前时就确定字段是否显隐且不可变时, 可以用直接用布尔值:  hidden: true
                            */
                            hidden,

                            /*
                                parse: 将表单字段值转换成内部组件需要的数据类型
                                例: parse: (value) => value && moment(value)
                                format: 将内部组件所控制的数据转换成表单字段所需的数据类型
                                例: format: (momentInstance) => momentInstance && momentInstance.format('YYYY-MM-DD')
                            */
                            parse,
                            format,

                            forceRender, // 强制渲染

                            /* 用于自定义渲染数组字段 */
                            renderList,
                            renderListItem,

                            /* labelCol、wrapperCol配置表单项 字段名及内容 栅格比例 */
                            labelCol: _labelCol,
                            wrapperCol: _wrapperCol,

                            initialValue, // 不可用, 使用Form.initialValues 代替
                            ...restFieldProps
                        } = field

                        let fieldLabelCol = _labelCol
                        let fieldWrapperCol = _wrapperCol
                        if (typeof fieldLabelCol === 'number') {
                            fieldLabelCol = { span: fieldLabelCol }
                        }
                        if (typeof fieldWrapperCol === 'number') {
                            fieldWrapperCol = { span: fieldWrapperCol }
                        }

                        /* prop: attach */
                        if (attach) {
                            originalField.attach = attach
                        }
                        if (attach && !name) {
                            window.console.error('Warning: 使用"attach"时, "name"为必填项.')
                            return (
                                <Typography.Text className="ant-form-text" type="danger">
                                    使用&quot;attach&quot;时, &quot;name&quot;为必填项.
                                </Typography.Text>
                            )
                        }

                        /* prop: hidden */
                        let isHidden = hidden
                        if (typeof hidden === 'function') {
                            hasHiddenFunction = true
                            const values = form.getFieldsValue()
                            isHidden = hidden({ ...initialValues, ...values })
                            hiddenStatusCaches[name || key] = isHidden
                        }
                        if (isHidden) {
                            return name
                                ? (
                                    <Form.Item
                                        key={key || name}
                                        name={name}
                                        labelCol={fieldLabelCol ?? labelCol}
                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                    >
                                        <span key={key || name} style={{ display: 'none' }} />
                                    </Form.Item>
                                ) : null
                        }

                        /* props.type: WhiteSpace */
                        if (type === 'WhiteSpace') {
                            return <div key={key} style={{ height, width: '100%', clear: 'both' }} />
                        }

                        /* layout === "inline" 且 columnCount 有值时, 需要额外填充满表单项宽度 */
                        const requiredFillWidth = layout === 'inline' && columnCount

                        /* prop: span, layout, columnCount */
                        const colSpan = span || (layout === 'inline' ? undefined : (~~(24 / columnCount) || 24))
                        if (render) {
                            if (type) {
                                window.console.error('Warning: 使用"render"时, "type"将不生效.')
                                return (
                                    <Form.Item
                                        label={label}
                                        labelCol={fieldLabelCol ?? labelCol}
                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                    >
                                        <Typography.Text className="ant-form-text" type="danger">
                                            使用&quot;render&quot;时, &quot;type&quot;将不生效.
                                        </Typography.Text>
                                    </Form.Item>
                                )
                            }
                            return (
                                <Col key={key || name} span={colSpan}>
                                    <Form.Item
                                        shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                                        {...restFieldProps}
                                        label={label}
                                        name={undefined}
                                        labelCol={fieldLabelCol ?? labelCol}
                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                    >
                                        {({ getFieldValue, getFieldsValue }) => {
                                            const values = getFieldsValue()
                                            const node = render(name ? getFieldValue(name) : undefined, values, form)
                                            if (typeof node === 'string' || typeof node === 'number') {
                                                return (
                                                    <Form.Item name={name}>
                                                        <span className="ant-form-text">{node}</span>
                                                    </Form.Item>
                                                )
                                            }
                                            if (parse || format) {
                                                if (!name) {
                                                    window.console.error('Warning: 使用"parse"或"format"时, "name"为必填项.')
                                                    return (
                                                        <Typography.Text className="ant-form-text" type="danger">
                                                            使用&quot;parse&quot;或&quot;format&quot;时, &quot;name&quot;为必填项.
                                                        </Typography.Text>
                                                    )
                                                }
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
                                                    <Form.Item
                                                        name={name}
                                                        {...restFieldProps}
                                                        labelCol={fieldLabelCol ?? labelCol}
                                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                                        className={classNames({
                                                            'ant-form-item--compact': formItemCompact,
                                                            'ant-form-item--fill-width': requiredFillWidth,
                                                        })}
                                                    >
                                                        <CompWrapper />
                                                    </Form.Item>
                                                )
                                            }
                                            return (
                                                <Form.Item
                                                    name={name}
                                                    {...restFieldProps}
                                                    labelCol={fieldLabelCol ?? labelCol}
                                                    wrapperCol={fieldWrapperCol ?? wrapperCol}
                                                    className={classNames({
                                                        'ant-form-item--compact': formItemCompact,
                                                        'ant-form-item--fill-width': requiredFillWidth,
                                                    })}
                                                >
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
                                            labelCol={fieldLabelCol ?? labelCol}
                                            wrapperCol={fieldWrapperCol ?? wrapperCol}
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
                        /* props.type: WhiteSpace */
                        if (type === 'WhiteSpace') {
                            return <div key={key || name} style={{ height, width: '100%', clear: 'both' }} />
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
                                    <Form.Item
                                        label={label}
                                        name={name}
                                        {...restFieldProps}
                                        labelCol={fieldLabelCol ?? labelCol}
                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                    >
                                        <CompWrapper />
                                    </Form.Item>
                                </Col>
                            )
                        }
                        return (
                            <Col key={key || name} span={colSpan}>
                                <Form.Item
                                    label={label}
                                    name={name}
                                    {...restFieldProps}
                                    labelCol={fieldLabelCol ?? labelCol}
                                    wrapperCol={fieldWrapperCol ?? wrapperCol}
                                >
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
