import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { ValidateErrorEntity, Store } from 'rc-field-form/lib/interface'

export const FormContext = React.createContext({
    form: undefined,
    onFormFinish: undefined,
    onFormFinishFailed: undefined,
    onFormValuesChange: undefined,
    addValuesChangeListener: undefined,
})

type FormProviderProps = {
    getForm?: (form: FormInstance) => void;
    children: React.ReactNode;
    onFinish?: (values: Store) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}

const FormProvider = ({
    getForm, children, onFinish, onFinishFailed,
}: FormProviderProps) => {
    const [form] = Form.useForm()

    const [valuesChangeListeners] = useState([])

    useEffect(() => {
        getForm(form)
    }, [form, getForm])

    return (
        <FormContext.Provider
            value={{
                form,
                addValuesChangeListener: (onValuesChange) => { valuesChangeListeners.push(onValuesChange) },
                onFormFinish: () => { onFinish(form.getFieldsValue()) },
                onFormFinishFailed: (errorInfo) => { onFinishFailed(errorInfo) },
                onFormValuesChange: (changedValues, values) => {
                    valuesChangeListeners.forEach((onValuesChange) => {
                        onValuesChange(changedValues, values)
                    })
                },
            }}
        >
            { children }
        </FormContext.Provider>
    )
}

FormProvider.defaultProps = {
    getForm: () => {},
    onFinish: () => {},
    onFinishFailed: undefined,
}

export default FormProvider
