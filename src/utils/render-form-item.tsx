import {
    Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, TimePicker, TreeSelect, Typography,
} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import React from 'react'
import { FormProps, LayoutProps } from './render-form'

export interface FormItemProps {
    key: string;
    label?: string;
    hidden?: boolean;
    render?: (value: any, values: any, form: WrappedFormUtils) => any;
    type?: string;
    help?: string;
    layout?: LayoutProps;
    readonly?: boolean;
    [attr: string]: any;
}

export interface RenderComponentProps {
    render: () => any;
}

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { Group: InputGroup, Search: InputSearch, TextArea } = Input
const { MonthPicker, RangePicker } = DatePicker

interface TextProps {
    editable: boolean;
    value?: any;
    onChange?: (value: string) => void;
}

const TypographyText = (props: TextProps, ref: React.RefObject<HTMLSpanElement>) => {
    const { editable: _editable, onChange, value } = props
    const editable = {
        onChange: (val?: string) => {
            onChange && onChange(val)
        },
    }
    return (
        <Typography.Text
            className="ant-form-text"
            editable={_editable && editable}
        >
            <span ref={ref}>
                {value || (value === 0 ? 0 : (_editable ? <span style={{ marginRight: -8 }} /> : '-'))}
            </span>
        </Typography.Text>
    )
}

const Text = React.forwardRef(TypographyText)

const FORM_TYPES = {
    Input,
    InputNumber,
    InputSearch,
    Select,
    DatePicker,
    RangePicker,
    MonthPicker,
    TreeSelect,
    RadioGroup,
    Cascader,
    Checkbox,
    CheckboxGroup,
    InputGroup,
    TimePicker,
    TextArea,
    Text,
}

class RenderComponent extends React.Component<RenderComponentProps> {
    render() {
        const { render } = this.props
        return render() || null
    }
}

function renderFormItem(form: WrappedFormUtils, formItem: FormItemProps, formProps: FormProps = {}) {
    const { getFieldDecorator } = form
    const defaultLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    if (formItem.hidden) {
        return null
    }
    let layout: LayoutProps
    if (formProps.isInline) {
        layout = {}
    } else {
        layout = Object.assign({}, defaultLayout, formProps.layout, formItem.layout)
    }
    // 自定义渲染
    if (formItem.render) {
        if (formItem.type) { window.console.warn('render与type同时存在, type属性将失效') }
        const values = form.getFieldsValue()
        return (
            <FormItem
                {...layout}
                label={formItem.label}
                key={formItem.key}
                help={formItem.help}
                extra={formItem.extra}
                className={formItem.readonly && 'ant-form-item--readonly'}
            >
                {
                    getFieldDecorator(
                        formItem.key,
                        formItem.option,
                    )((
                        <RenderComponent render={() => formItem.render(values[formItem.key], values, form)} />
                    ))
                }
            </FormItem>
        )
    }
    // 通过 type 指定渲染组件
    const Comp = FORM_TYPES[formItem.type] || <div>不支持的表单项</div>
    return (
        <FormItem
            labelAlign={formProps.labelAlign || 'right'}
            {...layout}
            label={formItem.label}
            key={formItem.key}
            help={formItem.help}
            extra={formItem.extra}
            className={formItem.readonly && 'ant-form-item--readonly'}
        >
            {
                getFieldDecorator(
                    formItem.key,
                    formItem.option,
                )((
                    <Comp {...formItem.otherProps}>
                        {formItem.children || null}
                    </Comp>
                ))
            }
        </FormItem>
    )
}

export default renderFormItem
