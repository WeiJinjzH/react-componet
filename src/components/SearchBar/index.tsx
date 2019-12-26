import { CaretDown, CaretUp } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FormProps } from 'rc-field-form/lib/Form'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import FormBlock from '../FormBlock'
import './index.less'

const DEFAULT_VISIBLE_FIELDS_COUNT = 4

interface SearchBarProps extends FormProps {
    form?: FormInstance;
    fields: any[];
    collapsible?: boolean;
    visibleFieldsCount?: number;
    onSearch?: (values?: any) => void;
    showReset?: boolean;
    getForm?: (form: FormInstance) => void;
    finishWithHiddenValues?: boolean;
    extra?: React.ReactNode;
}

export const SearchBar = ({
    form: _form,
    fields = [],
    onSearch,
    showReset,
    children,
    collapsible: _collapsible,
    visibleFieldsCount: _visibleFieldsCount = DEFAULT_VISIBLE_FIELDS_COUNT,
    style,
    extra,
    getForm,
    initialValues,
    ...restProps
}: SearchBarProps) => {
    const [form] = Form.useForm(_form)
    const [clientWidth, setClientWidth] = useState(() => window.document.body.clientWidth)
    const [collapse, setCollapse] = useState(true)

    useLayoutEffect(() => {
        getForm && getForm(form)
    }, [getForm, form])

    useLayoutEffect(() => {
        const resizeListener = () => {
            setClientWidth(window.document.body.clientWidth)
        }
        window.addEventListener('resize', resizeListener)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])

    let visibleFieldsCount = _visibleFieldsCount
    let collapsible = _collapsible
    if (_collapsible && typeof _visibleFieldsCount === 'object') {
        Object.keys(visibleFieldsCount).sort((a, b) => Number(a) - Number(b)).forEach((key) => {
            if (Number.isNaN(Number(key))) {
                window.console.error('visibleFieldsCount类型为Object时, 其成员属性必须为数字。')
            }
            if (clientWidth > Number(key)) {
                collapsible = !!_visibleFieldsCount[key]
                visibleFieldsCount = _visibleFieldsCount[key] || Number.MAX_SAFE_INTEGER
            }
        })
        visibleFieldsCount = typeof visibleFieldsCount === 'number' ? visibleFieldsCount : DEFAULT_VISIBLE_FIELDS_COUNT
    }

    /* 可收缩 & 未展开 & fieldsLength <= visibleFieldsCount */
    if (collapsible && collapse && fields.length <= visibleFieldsCount) {
        collapsible = false
    }

    const integratedFields = useMemo(() => {
        const operateFields = [
            {
                key: '__operate-items',
                style: { marginRight: 8 },
                render: function OperateItems() {
                    return (
                        <>
                            <Button htmlType="submit" type="primary"> 查询 </Button>
                            {
                                showReset ? (
                                    <Button
                                        htmlType="reset"
                                        onClick={() => {
                                            form.resetFields()
                                            form.submit()
                                        }}
                                    >
                                        重置
                                    </Button>
                                ) : null
                            }
                            { extra }
                            {
                                collapsible ? (
                                    <Button type="link" className="collapse-btn" onClick={() => { setCollapse(!collapse) }}>
                                        {collapse ? '展开' : '收起'}
                                        {collapse ? <CaretDown /> : <CaretUp />}
                                    </Button>
                                ) : null
                            }
                        </>
                    )
                },
            },
        ]
        return [
            ...fields.slice(0, (collapsible && collapse) ? visibleFieldsCount : Number.MAX_SAFE_INTEGER),
            ...operateFields,
        ]
    }, [fields, collapsible, collapse, visibleFieldsCount, showReset, extra, form])

    if (fields.length === 0) {
        return null
    }

    return (
        <div className="search-bar" style={style}>
            <FormBlock
                form={form}
                layout="inline"
                fields={integratedFields}
                finishWithHiddenValues
                onFinish={onSearch}
                initialValues={initialValues}
                {...restProps}
            />
            {
                children ? (
                    <div className="search-bar-children" style={{ paddingBottom: 24 }}>
                        { children }
                    </div>
                ) : null
            }
        </div>
    )
}

export default SearchBar
