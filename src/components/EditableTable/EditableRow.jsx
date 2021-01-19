import React, { Component } from 'react'

class EditableRow extends Component {
    componentDidMount() {
        if (this.props.record.getForm()) { return }
        this.props.record.setForm(this.props.form)
    }

    componentWillReceiveProps(nextProps) {
        const currentKey = this.props.record.getKey()
        const nextKey = nextProps.record.getKey()
        if (currentKey !== nextKey) {
            nextProps.record.setForm(nextProps.form)
        }
    }

    render() {
        const {
            form,
            index,
            ...props
        } = this.props
        return (
            <tr {...props} />
        )
    }
}

export default EditableRow
