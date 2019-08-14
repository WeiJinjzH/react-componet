import React from 'react'
import { Form, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { ColProps } from 'antd/lib/grid/col'
import renderFormItem, { FormItemProps } from './render-form-item'

type ColSpanType = number | string;

export interface LayoutProps {
    labelCol?: { span: ColSpanType };
    wrapperCol?: { span: ColSpanType };
}

export interface FormProps {
    colSpan?: ColSpanType | ColProps;
    layout?: LayoutProps;
    isInline?: boolean;
    readonly?: boolean;
    labelAlign?: 'left' | 'right';
}

/**
 * 表单渲染工具
 */
function renderForm(form: WrappedFormUtils, formItems: Array<FormItemProps>, formProps: FormProps = {}) {
    let formColProps = formProps.colSpan
    if (typeof formColProps === 'number') {
        formColProps = {
            span: formColProps,
        }
    }
    return (
        <Form labelAlign={formProps.labelAlign || 'right'} className={`render-form${formProps.readonly ? ' render-form--readonly' : ''}`}>
            <Row type="flex" style={{ flexWrap: 'wrap' }}>
                {
                    formItems.map((item) => {
                        if (item.hidden) {
                            return null
                        }
                        if (item.type === 'WhiteSpace') {
                            return <div key={item.key} style={{ height: item.height || 0, width: '100%', clear: 'both' }} />
                        }
                        let itemColProps = item.colSpan
                        if (typeof itemColProps === 'number') {
                            itemColProps = {
                                span: item.colSpan,
                            }
                        }
                        const colProps = itemColProps || formColProps || { span: 12 }
                        return (
                            <Col
                                key={item.key}
                                {...colProps}
                            >
                                { renderFormItem(form, item, formProps) }
                            </Col>
                        )
                    })
                }
            </Row>
        </Form>
    )
}

export default renderForm
