import {
    Col, Form, Row, Typography,
} from 'antd'
import React, { useLayoutEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP } from './preset.js'
import './index.less'

/** 更新单个表单项 */
const ObservedFormItem = ({
    children,
    getUpdater,
}) => {
    const [, _update] = useState()
    const update = _update.bind(null, {})
    getUpdater(update)
    return children()
}

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
        /* 表单提交时, 是否返回 hidden 为 true 时隐藏的字段值 */
        finishWithHiddenValues = false,
        className,
        layout,
        children,
        onSubmit,
        minWidth: _minWidth,
        maxWidth: _maxWidth,
        width: _width,
        onValuesChange,
        ...restFormProps
    } = props

    const [form] = Form.useForm(_form)
    const ref = useRef({ hiddenStatusCaches: {}, updaterMap: {} })
    const { hiddenStatusCaches, updaterMap } = ref.current

    /** 是否存在函数类型的hidden属性 */
    let hasHiddenFunction = false

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

    const getAttachValues = (values, filterNames = []) => {
        let attachValues = fields.filter((field) => field.attach && !hiddenStatusCaches[field.name])
            .map((field) => field.attach(values[field.name], field.name, values))
            .reduce((result, value) => ({ ...result, ...value }), {})
        if (filterNames.length) {
            const filterMap = {}
            filterNames.forEach((fieldName) => {
                filterMap[fieldName] = attachValues[fieldName]
            })
            attachValues = filterMap
        }
        return attachValues
    }

    const formRef = useRef({
        proxyForm: new Proxy(form, {
            get: (target, name) => {
                if (name === 'origin') { return form }
                if (name === 'validateFields') {
                    return (...args) => target[name](...args).then((values) => {
                        const attachValues = getAttachValues(values)
                        return Promise.resolve({ ...values, ...attachValues })
                    }).catch((errorInfo) => {
                        const attachValues = getAttachValues(errorInfo.values)
                        errorInfo.values = { ...errorInfo.values, ...attachValues }
                        return Promise.reject(errorInfo)
                    })
                }
                if (name === 'getAttachValues') {
                    return (...args) => {
                        const values = target.getFieldsValue()
                        return getAttachValues(values, args[0])
                    }
                }
                if (name === 'getAttachValue') {
                    return (fieldName) => {
                        const values = target.getFieldsValue()
                        return getAttachValues(values)[fieldName]
                    }
                }
                return target[name]
            },
        }),
    })

    const { proxyForm } = formRef.current

    useLayoutEffect(() => {
        getForm && getForm(proxyForm)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Form
            className={classNames({
                'form-block': true,
                'form-block--compact': compact,
                [className]: !!className,
            })}
            form={form}
            layout={layout}
            scrollToFirstError
            initialValues={initialValues}
            {...restFormProps}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            onFinish={(values) => {
                if (onFinish) {
                    if (!finishWithHiddenValues) {
                        Object.keys(values).forEach((key) => {
                            if (hiddenStatusCaches[key]) {
                                delete values[key]
                            }
                        })
                    }
                    /* 调用"attach"转换输出值 */
                    const attachValue = getAttachValues(values)
                    /* 合并转换后的数据 */
                    onFinish({ ...values, ...attachValue }, form)
                }
            }}
            onValuesChange={(changedValues, values) => {
                if (hasHiddenFunction) {
                    const requireUpdate = fields.filter((item) => typeof item.hidden === 'function')
                        .some((item) => !!item.hidden(values) !== hiddenStatusCaches[item.key || item.name])
                    requireUpdate && update()
                }
                Object.keys(updaterMap).forEach((key) => {
                    updaterMap[key]()
                })
                onValuesChange && onValuesChange(changedValues, values)
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

                        let help = _help
                        let validateStatus = _validateStatus

                        let fieldLabelCol = _labelCol
                        let fieldWrapperCol = _wrapperCol
                        if (typeof fieldLabelCol === 'number') {
                            fieldLabelCol = { span: fieldLabelCol }
                        }
                        if (typeof fieldWrapperCol === 'number') {
                            fieldWrapperCol = { span: fieldWrapperCol }
                        }
                        if (initialValue) {
                            window.console.error(`
                                Warning: 使用Form属性initialValues替代Form.Item属性initialValue
                            `)
                        }
                        /* prop: attach */
                        if (attach) {
                            originalField.attach = attach
                        }
                        if (attach && !name) {
                            window.console.error('Warning: 使用"attach"时, "name"为必填项.')
                            validateStatus = 'error'
                            help = '使用"attach"时, "name"为必填项.'
                        }

                        /* prop: hidden */
                        let isHidden = hidden
                        if (typeof hidden === 'function') {
                            hasHiddenFunction = true
                            const values = form.getFieldsValue()
                            isHidden = !!hidden({ ...initialValues, ...values })
                            hiddenStatusCaches[key || name] = isHidden
                        }
                        if (isHidden) {
                            return name
                                ? (
                                    <Form.Item
                                        key={key || name}
                                        name={name}
                                        {...restFieldProps}
                                        hidden
                                        rules={undefined}
                                        labelCol={fieldLabelCol ?? labelCol}
                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                        noStyle
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
                        let colSpan
                        if (requiredFillWidth) {
                            colSpan = span ?? ~~(24 / columnCount)
                        } else {
                            colSpan = span ?? (layout === 'inline' ? undefined : (~~(24 / columnCount) || 24))
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
                                values, value, extra, before, after,
                            }
                        }

                        const getUpdater = (updater) => {
                            if (typeof _before === 'function') {
                                updaterMap[key || name] = updater
                            } else if (typeof _after === 'function') {
                                updaterMap[key || name] = updater
                            } else if (typeof _extra === 'function') {
                                updaterMap[key || name] = updater
                            }
                        }

                        if (render && type) {
                            window.console.error('[FormBlock]Warning: 使用"render"时, "type"将不生效.')
                        }
                        if (render) {
                            return (
                                <React.Fragment key={key || name}>
                                    <Col span={colSpan} style={{ minWidth, maxWidth, width }}>
                                        <ObservedFormItem getUpdater={getUpdater}>
                                            {
                                                () => {
                                                    const {
                                                        value, values, extra, before, after,
                                                    } = enhanceFormItemPorps()
                                                    return (
                                                        <Form.Item
                                                            shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                                                            label={label}
                                                            name={undefined}
                                                            extra={extra}
                                                            help={help}
                                                            validateStatus={validateStatus}
                                                            labelCol={fieldLabelCol ?? labelCol}
                                                            wrapperCol={fieldWrapperCol ?? wrapperCol}
                                                            className={classNames({
                                                                'ant-form-item--compact': formItemCompact,
                                                                'ant-form-item--fill-width': requiredFillWidth,
                                                            })}
                                                        >
                                                            {() => {
                                                                const node = render(value, values, form)
                                                                if (node === null
                                                                    || typeof node === 'string'
                                                                    || typeof node === 'number'
                                                                    || typeof node === 'undefined'
                                                                    || typeof node === 'boolean'
                                                                    || Array.isArray(node)) {
                                                                    return (
                                                                        <>
                                                                            {before}
                                                                            <Form.Item
                                                                                name={name}
                                                                                {...restFieldProps}
                                                                                noStyle
                                                                            >
                                                                                <span>{node}</span>
                                                                            </Form.Item>
                                                                            {after}
                                                                        </>
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
                                                                        <>
                                                                            {before}
                                                                            <Form.Item
                                                                                name={name}
                                                                                {...restFieldProps}
                                                                                noStyle
                                                                            >
                                                                                <CompWrapper />
                                                                            </Form.Item>
                                                                            {after}
                                                                        </>
                                                                    )
                                                                }
                                                                return (
                                                                    <>
                                                                        {before}
                                                                        <Form.Item
                                                                            name={name}
                                                                            {...restFieldProps}
                                                                            noStyle
                                                                        >
                                                                            {node}
                                                                        </Form.Item>
                                                                        {after}
                                                                    </>
                                                                )
                                                            }}
                                                        </Form.Item>
                                                    )
                                                }
                                            }
                                        </ObservedFormItem>
                                    </Col>
                                    {!!lineBreak && <div className="form-block--line-break" />}
                                </React.Fragment>
                            )
                        }
                        if (renderList || renderListItem) {
                            return (
                                <React.Fragment key={key || name}>
                                    <Col span={colSpan} style={{ minWidth, maxWidth, width }}>
                                        <ObservedFormItem getUpdater={getUpdater}>
                                            {
                                                () => {
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
                                                            extra={extra}
                                                            labelCol={fieldLabelCol ?? labelCol}
                                                            wrapperCol={fieldWrapperCol ?? wrapperCol}
                                                            className={classNames({
                                                                'ant-form-item--compact': formItemCompact,
                                                                'ant-form-item--fill-width': requiredFillWidth,
                                                            })}
                                                        >
                                                            <Form.List
                                                                shouldUpdate={(prevValues, nextValues) => prevValues[name] !== nextValues[name]}
                                                                name={name}
                                                                {...restFieldProps}
                                                                labelCol={fieldLabelCol ?? labelCol}
                                                                wrapperCol={fieldWrapperCol ?? wrapperCol}
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
                                                                                            { _node }
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
                                            }
                                        </ObservedFormItem>
                                    </Col>
                                    {!!lineBreak && <div className="form-block--line-break" />}
                                </React.Fragment>
                            )
                        }
                        const Comp = PRESET_FORM_COMPONENT_TYPE[type] || (function WarningText() {
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
                                <React.Fragment key={key || name}>
                                    <Col span={colSpan} style={{ minWidth, maxWidth, width }}>
                                        <ObservedFormItem getUpdater={getUpdater}>
                                            {
                                                () => {
                                                    const { extra } = enhanceFormItemPorps()
                                                    return (
                                                        <Form.Item
                                                            label={label}
                                                            name={name}
                                                            {...restFieldProps}
                                                            extra={extra}
                                                            labelCol={fieldLabelCol ?? labelCol}
                                                            wrapperCol={fieldWrapperCol ?? wrapperCol}
                                                        >
                                                            <CompWrapper />
                                                        </Form.Item>
                                                    )
                                                }
                                            }
                                        </ObservedFormItem>
                                    </Col>
                                    {!!lineBreak && <div className="form-block--line-break" />}
                                </React.Fragment>
                            )
                        }
                        return (
                            <React.Fragment key={key || name}>
                                <Col
                                    span={colSpan}
                                    style={{ minWidth, maxWidth, width }}
                                    className={classNames({
                                        'ant-form-item--compact': formItemCompact,
                                        'ant-form-item--fill-width': requiredFillWidth,
                                    })}
                                >
                                    <ObservedFormItem getUpdater={getUpdater}>
                                        {
                                            () => {
                                                const { extra } = enhanceFormItemPorps()
                                                return (
                                                    <Form.Item
                                                        label={label}
                                                        name={name}
                                                        {...restFieldProps}
                                                        extra={extra}
                                                        labelCol={fieldLabelCol ?? labelCol}
                                                        wrapperCol={fieldWrapperCol ?? wrapperCol}
                                                    >
                                                        <Comp {...componentProps} />
                                                    </Form.Item>
                                                )
                                            }
                                        }
                                    </ObservedFormItem>
                                </Col>
                                {!!lineBreak && <div className="form-block--line-break" />}
                            </React.Fragment>
                        )
                    })
                }
            </Row>
            {children}
        </Form>
    )
}

export default FormBlock
