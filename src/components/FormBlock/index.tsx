import { Form, Row } from 'antd'
import { ColProps } from 'antd/lib/col'
import { FormInstance } from 'antd/lib/form'
import classNames from 'classnames'
import React, { useLayoutEffect, useRef, useState } from 'react'
import FormItem from './FormItem'
import './index.less'

export interface IProxyFormInstance extends FormInstance {
    cacheComponentMap: any;
    updaterMap: any;
    hiddenStatusCaches: any;
}

export interface FormBlockProps {
    form?: IProxyFormInstance;
    getForm?: (form: IProxyFormInstance) => void;
    fields?: { [key: string]: any }[];
    compact?: boolean;
    onFinish?: (values: object, form: IProxyFormInstance) => void;
    initialValues?: object;
    finishWithHiddenValues?: boolean;
    className?: string;
    layout?: 'horizontal' | 'inline' | 'vertical';
    children?: React.ReactNode;
    onValuesChange?: (changedValues: object, values: object) => void;
    labelCol?: number | ColProps;
    wrapperCol?: number | ColProps;
    span?: number;
    minWidth?: number | string;
    maxWidth?: number | string;
    width?: number | string;
    placeholder?: boolean | string | string[] | ((params: any, form: IProxyFormInstance) => string | string[]);
}

const getValue = (values?: any, namePath?: string[]): any => {
    if (values === undefined || values === null) {
        return values
    }
    if (Array.isArray(namePath)) {
        if (namePath.length > 0) {
            return getValue(values[namePath[0]], namePath.slice(1))
        }
        return values
    }
    return values[namePath]
}

const FormBlock = (props: FormBlockProps) => {
    const {
        form: _form,
        /* 回调获取表单实例 FormInstance */
        getForm,
        /* 字段配置 */
        fields = [],
        /* 紧凑模式 */
        compact,
        /* 表单提交时的回调 function(values, formInstance) */
        onFinish,
        /* 初始值 */
        initialValues,
        /* 表单提交时, 是否返回 hidden 为 true 时隐藏的字段值 */
        finishWithHiddenValues = false,
        className,
        layout,
        children,
        onValuesChange,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        placeholder, // 拦截该字段到Form
        ...restFormProps
    } = props

    const [form] = Form.useForm(_form) as [IProxyFormInstance]
    const ref = useRef({ hiddenStatusCaches: {}, cacheComponentMap: new Map(), updaterMap: {} })
    const { hiddenStatusCaches, cacheComponentMap, updaterMap } = ref.current

    /** 是否存在函数类型的hidden属性 */
    const hasHiddenFunction = false

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
            .map((field) => field.attach(getValue(values, field.name), field.name, values))
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
                if (name === 'updaterMap') { return updaterMap }
                if (name === 'cacheComponentMap') { return cacheComponentMap }
                if (name === 'hiddenStatusCaches') { return hiddenStatusCaches }
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
        getForm?.(proxyForm)
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
                    if (requireUpdate) {
                        update()
                    }
                }
                Object.keys(updaterMap).forEach((key) => {
                    updaterMap[key]()
                })
                onValuesChange?.(changedValues, values)
            }}
        >
            <Row className="items-wrapper">
                {
                    fields.map((originalField) => (
                        <FormItem
                            form={proxyForm}
                            key={originalField.key || originalField.name}
                            formProps={props}
                            field={originalField}
                        />
                    ))
                }
            </Row>
            {children}
        </Form>
    )
}

export default FormBlock
