import { DoubleRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import React, { useMemo, useRef, useState } from 'react'
import FormBlock, { FormBlockProps, IProxyFormInstance } from '../FormBlock'
import './index.less'

interface fieldsProps<T> extends Array<T> {
    isFiltered?: boolean;
}

interface SearchBarProps extends FormBlockProps {
    form?: IProxyFormInstance;
    mainFields?: { isFiltered: boolean, [key:string]: any }[];
    placeholder?: boolean | string | string[] | ((params: any, form: IProxyFormInstance) => string | string[]);
    fields: fieldsProps<any>;
    onSearch?: (values?: any) => void;
    showReset?: boolean;
    getForm?: (form: IProxyFormInstance) => void;
    style?: object;
    extra?: React.ReactNode;
}

export const SearchBar = ({
    fields = [],
    onSearch,
    showReset = true,
    children,
    style,
    extra,
    getForm,
    placeholder = false,
    mainFields = [],
    ...restProps
}: SearchBarProps): JSX.Element => {
    const [collapse, setCollapse] = useState(true)

    const ref = useRef({
        form: undefined,
        originalHiddenMap: new Map(),
    })

    const { originalHiddenMap } = ref.current

    /**
     * mainField中 type = 'InputSearch'的字段做特殊处理, 给予属性及点击事件赋值
     */
    mainFields.forEach((mainField) => {
        if (mainField?.type === 'InputSearch') {
            mainField.props = mainField.props || {}
            mainField.props.onSearch = (value, e) => {
                if (e && e.target && e.type === 'click' && !value) {
                    ref.current.form.resetFields([mainField.name])
                }
                ref.current.form.submit()
            }
            mainField.props.enterButton = mainField.props.enterButton ?? true
            mainField.props.allowClear = mainField.props.allowClear ?? true
            mainField.props.placeholder = mainField.props.placeholder ?? (mainField.label ? `请输入${mainField.label}` : '')
            delete mainField.label
        }
    })

    const integratedFields = useMemo(() => {
        if (fields.isFiltered) {
            fields.isFiltered = false
            fields.forEach((field) => {
                field.hidden = originalHiddenMap.get(field.key ?? field.name)
            })
        }
        if (mainFields.length && collapse) {
            fields.isFiltered = true
            fields.forEach((field) => {
                originalHiddenMap.set(field.key ?? field.name, field.hidden)
                field.hidden = true
            })
        }
        return [
            ...mainFields,
            {
                key: '$advancedButton',
                hidden: mainFields.length === 0 || fields.length === 0,
                colProps: { className: 'advanced-search-button' },
                render: function AdvancedButton() {
                    return (
                        <Button
                            type="primary"
                            onClick={() => {
                                setCollapse(!collapse)
                            }}
                        >
                            高级搜索
                            <DoubleRightOutlined rotate={collapse ? 90 : -90} />
                        </Button>
                    )
                },
                lineBreak: !extra,
            },
            {
                key: '$extra',
                hidden: !extra,
                render: function Extra() {
                    let extraContent = extra
                    if (typeof extra === 'function') {
                        extraContent = extra()
                    }
                    return <div style={{ display: 'inline-flex', justifyContent: 'center' }}>{extraContent}</div>
                },
                colProps: { className: 'search-bar-extra' },
                lineBreak: true,
            },
            ...fields,
            {
                key: '$operateItems',
                colProps: { className: 'search-bar-operate' },
                hidden: (mainFields.length && collapse) || fields.length === 0,
                render: function OperateItems() {
                    return (
                        <>
                            {
                                showReset ? (
                                    <Button
                                        htmlType="reset"
                                        type={mainFields.length === 0 ? 'default' : 'link'}
                                        onClick={() => {
                                            ref.current.form.resetFields()
                                            ref.current.form.submit()
                                        }}
                                    >
                                        {mainFields.length === 0 ? '重置' : '重置条件'}
                                    </Button>
                                ) : null
                            }
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                查询
                            </Button>
                        </>
                    )
                },
            },
        ]
    }, [fields, mainFields, collapse, extra, showReset])

    if (fields.length === 0 && mainFields.length === 0 && !extra && !children) {
        return null
    }

    return (
        <div
            className={classNames({
                'search-bar': true,
                'search-bar-advanced': mainFields.length > 0,
            })}
            style={style}
        >
            <FormBlock
                getForm={(_form) => {
                    ref.current.form = _form
                    getForm?.(_form)
                }}
                layout="inline"
                fields={integratedFields}
                onFinish={onSearch}
                placeholder={placeholder}
                {...restProps}
            />
            {
                children ? (
                    <div className="search-bar-children">
                        { children }
                    </div>
                ) : null
            }
        </div>
    )
}

export default SearchBar
