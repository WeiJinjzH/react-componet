import React, { useEffect } from 'react'
import { Form } from 'antd'

const FormProvider = ({ getForm, children, onFinish }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        getForm && getForm(form)
    }, [form, getForm])

    return (
        <Form.Provider onFormFinish={() => { onFinish(form.getFieldsValue()) }}>
            { children(form) }
            <Form component={false} form={form} />
        </Form.Provider>
    )
}

export default FormProvider
