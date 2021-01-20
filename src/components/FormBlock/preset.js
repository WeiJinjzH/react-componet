import {
    DatePicker, Input, InputNumber, Radio, Select, Typography, Switch,
} from 'antd'
import moment from 'moment'

/** 带有输入防抖校验的Input组件 */
const DebounceValidateInput = React.forwardRef((props, inputRef) => {
    const {
        onValidate, delay, reset, ...restProps
    } = props
    const ref = React.useRef({ onValidate: utils.debounce(onValidate, delay) })
    if (!onValidate) {
        return <Typography.Text className="ant-form-text" type="danger">不支持覆盖validateTrigger和trigger属性值</Typography.Text>
    }
    const Component = props.type === 'password' ? Input.Password : Input
    return (
        <Component
            ref={inputRef}
            {...restProps}
            onChange={(e) => {
                e.persist()
                if (e && e.target && e.type === 'click' && !e.target.value) {
                    reset()
                }
                restProps.onChange && restProps.onChange(e)
                ref.current.onValidate(e)
            }}
            onKeyUp={(e, ...args) => {
                e.persist()
                restProps.onKeyUp && restProps.onKeyUp(e, ...args)
                ref.current.onValidate(e)
            }}
        />
    )
})
DebounceValidateInput.displayName = 'DebounceValidateInput'

const Text = (props) => {
    const onChange = (props.editable && props.editable.onChange) || ((str) => {
        props.onChange && props.onChange(str)
    })
    const editable = {
        onChange,
    }
    if (props.value !== null && !['number', 'undefined', 'string'].includes(typeof props.value)) {
        return <Typography.Text className="ant-form-text" type="danger">{`数据类型错误, 类型不能是"${typeof props.value}"`}</Typography.Text>
    }
    return (
        <Typography.Text
            className="ant-form-text"
            editable={props.editable && editable}
        >
            {props.value || (props.value === 0 ? 0 : props.editable ? <span style={{ marginRight: -8 }} /> : '-')}
        </Typography.Text>
    )
}

const PRESET_FORM_COMPONENT_TYPE = {
    Input,
    InputPassword: Input.Password,
    InputSearch: Input.Search,
    TextArea: Input.TextArea,
    InputNumber,
    Select,
    Switch,
    DatePicker,
    RangePicker: DatePicker.RangePicker,
    RangePickerWithTime: DatePicker.RangePicker,
    RadioGroup: Radio.Group,
    Text,
    Money: Text,
    Percent: Text,
    DebounceValidateInput,
}

const PRESET_PROPS_MAP = {
    RangePicker: {
        props: {
            placeholder: ['开始日期', '结束日期'],
        },
        attach: (values, name, fieldsValues) => {
            delete fieldsValues[name]
            return ({
                [`start${name}`]: values && values[0] && values[0].format('YYYY-MM-DD'),
                [`end${name}`]: values && values[1] && values[1].format('YYYY-MM-DD'),
            })
        },
    },
    RangePickerWithTime: {
        props: { showTime: true },
        attach: (values, name, fieldsValues) => {
            delete fieldsValues[name]
            return ({
                [`start${name}`]: values && values[0] && values[0].format('YYYY-MM-DD HH:mm:ss'),
                [`end${name}`]: values && values[1] && values[1].format('YYYY-MM-DD HH:mm:ss'),
            })
        },
    },
    Money: (field) => {
        const { precision = 2, prefix = '¥', trim = false } = field?.props || {}
        return ({
            parse: (value) => {
                if (Number.isNaN(Number(value))) {
                    return '-'
                }
                const moneyString = utils.formatMoney(value, precision, prefix)
                if (trim && moneyString.indexOf('.')) {
                    return moneyString.replace(/\.?0+$/g, '')
                }
                return moneyString
            },
        })
    },
    Percent: (field) => {
        const { precision = 2, trim = false } = field?.props || {}
        return ({
            parse: (value) => {
                if (Number.isNaN(Number(value))) {
                    return '-'
                }
                const percent = Number(value * 100).toFixed(precision)
                if (trim) {
                    return `${+Number(percent)}%`
                }
                return `${percent}%`
            },
        })
    },
    DatePicker: {
        parse: (value) => value && moment(value),
        format: (momentInstance) => momentInstance && momentInstance.format('YYYY-MM-DD'),
    },
    Switch: {
        valuePropName: 'checked',
    },
    DebounceValidateInput: (field, form) => ({
        getValueFromEvent: (e) => {
            if (!e || !e.target) { return e }
            const { target } = e
            return target.type === 'checkbox' ? target.checked : target.value
        },
        validateTrigger: 'onValidate',
        props: {
            delay: 400,
            reset: () => {
                form.setFields([{ name: field.name, value: undefined }])
            },
            onChange: (e) => {
                /* 输入过程, 移除校验错误信息 */
                form.setFields([{ name: field.name, value: e.target.value, errors: [] }])
                field?.props?.onChange?.(e)
            },
        },
    }),
}

export { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP }
