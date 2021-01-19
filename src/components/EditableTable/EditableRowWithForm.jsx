import { Form } from 'antd'
import EditableRow from './EditableRow'

const EditableRowWithForm = (props) => {
    const [form] = Form.useForm()
    return (
        <Form
            initialValues={props.record}
            component={false}
            form={form}
            name={props['data-row-key']}
            onValuesChange={(changedValues) => {
                const keys = Object.keys(changedValues)
                const temp = {}
                keys.forEach((key) => {
                    temp[key] = changedValues[key]
                })
                Object.assign(props.record, temp)
            }}
        >
            <EditableRow form={form} {...props} />
        </Form>
    )
}

export default EditableRowWithForm
