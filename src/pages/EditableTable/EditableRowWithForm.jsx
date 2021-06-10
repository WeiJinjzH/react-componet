import { Form } from 'antd'
import { Component } from 'react'
import EditableRow from './EditableRow'

class EditableRowWithForm extends Component {
    constructor(props) {
        super(props)
        this.RowWrapper = Form.create({
            name: props['data-row-key'],
            onFieldsChange: (_props, changedFields) => {
                const keys = Object.keys(changedFields)
                const temp = {}
                keys.forEach((key) => {
                    temp[key] = changedFields[key].value
                })
                Object.assign(_props.record, temp)
            },
        })(EditableRow)
    }

    render() {
        const { RowWrapper } = this
        return (
            <RowWrapper {...this.props} />
        )
    }
}

export default EditableRowWithForm
