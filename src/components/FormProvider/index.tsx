import React, { useEffect } from 'react'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { ValidateErrorEntity, Store } from 'rc-field-form/lib/interface'

type FormProviderProps = {
    getForm?: (form: FormInstance) => void;
    children: (form: FormInstance) => React.ReactNode;
    onFinish?: (values: Store) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}

const FormProvider = ({
    getForm, children, onFinish, onFinishFailed,
}: FormProviderProps) => {
    const [form] = Form.useForm()
    useEffect(() => {
        getForm(form)
    }, [form, getForm])

    return (
        <Form.Provider onFormFinish={() => { onFinish(form.getFieldsValue()) }}>
            { children(form) }
            <Form component={false} form={form} onFinishFailed={onFinishFailed} />
        </Form.Provider>
    )
}

FormProvider.defaultProps = {
    getForm: () => {},
    onFinish: () => {},
    onFinishFailed: undefined,
}

export default FormProvider
