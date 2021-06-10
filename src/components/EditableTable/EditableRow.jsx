import React, { Component } from 'react'
import { Form } from 'antd'
import EditableContext from './EditableContext'

class EditableRow extends Component {
    componentWillMount() {
        this.props.bindValidateFunc(this.props.form.validateFieldsAndScroll)
        this.props.bindResetFunc(this.props.form.resetFields)
    }

    componentWillUnmount() {
        this.props.form.validateFieldsAndScroll['[[clearMark]]'] = true
        this.props.form.resetFields['[[clearMark]]'] = true
    }

    render() {
        const {
            form,
            index,
            bindValidateFunc,
            bindResetFunc,
            ...props
        } = this.props
        return (
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        )
    }
}

export default Form.create()(EditableRow)
