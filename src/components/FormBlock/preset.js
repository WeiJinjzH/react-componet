import {
    DatePicker, Input, InputNumber, Radio, Select, Typography,
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
    InputNumber,
    Select,
    DatePicker,
    RangePicker: DatePicker.RangePicker,
    RangePickerWithTime: DatePicker.RangePicker,
    RadioGroup: Radio.Group,
    Text,
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
    DatePicker: {
        parse: (value) => value && moment(value),
        format: (momentInstance) => momentInstance && momentInstance.format('YYYY-MM-DD'),
    },
}

export { PRESET_FORM_COMPONENT_TYPE, PRESET_PROPS_MAP }