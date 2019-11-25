import { CaretDown, CaretUp } from '@ant-design/icons'
import { Button, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { FormProps } from 'rc-field-form/lib/Form'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import FormBlock from '../FormBlock'
import TextButton from '../TextButton'
import './index.less'

interface SearchBarProps extends FormProps {
    form?: FormInstance;
    fields: any[];
    collapsible?: boolean;
    visibleFieldsCount?: number;
    onSearch?: (values?: any) => void;
    onReset?: (values?: any) => void;
    getForm?: (FormInstance) => void;
    extra?: React.ReactNode;
}

export const SearchBar = ({
    form: _form, fields = [], onSearch, onReset, children, collapsible, visibleFieldsCount = 4, style, extra, getForm, ...restProps
}: SearchBarProps) => {
    const [form] = Form.useForm(_form)
    const [collapse, setCollapse] = useState(true)

    useLayoutEffect(() => {
        getForm && getForm(form)
    }, [getForm, form])

    const integratedFields = useMemo(() => {
        const operateFields = [
            {
                key: '__operate-items',
                style: { marginRight: 8 },
                render: function OperateItems() {
                    return (
                        <>
                            <Button htmlType="submit" type="primary">查询</Button>
                            {
                                onReset ? (
                                    <Button
                                        htmlType="reset"
                                        onClick={() => {
                                            form.resetFields()
                                            onReset()
                                        }}
                                    >
                                        重置
                                    </Button>
                                ) : null
                            }
                            {
                                collapsible ? (
                                    <TextButton className="collapse-btn" onClick={() => { setCollapse(!collapse) }}>
                                        {collapse ? '展开' : '收起'}
                                        {collapse ? <CaretDown /> : <CaretUp />}
                                    </TextButton>
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
    }, [fields, form, onReset, collapsible, collapse, visibleFieldsCount])

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
                {...restProps}
            >
                {extra}
            </FormBlock>
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
