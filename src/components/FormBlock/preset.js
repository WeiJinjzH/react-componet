import {
    DatePicker, Input, InputNumber, Radio, Select, Typography, Switch,
} from 'antd'
import moment from 'moment'

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
}

const PRESET_PROPS_MAP = {
    RangePicker: {
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
}

export { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP }
