import { Form } from 'antd'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface FormBlockProps {
    children: (form: WrappedFormUtils) => React.ReactNode;
    form: WrappedFormUtils,
    data?: { [key: string]: any, };
    getForm?: (form: WrappedFormUtils) => void;
    validateFields?: (func: () => {}) => void;
}

class FormBlock extends Component<FormBlockProps> {
    validateFieldsAndScroll: any;

    static defaultProps = {
        data: undefined,
        validateFields: () => {},
        getForm: () => {},
    }

    static propTypes = {
        getForm: PropTypes.func,
        data: PropTypes.objectOf(PropTypes.any),
        validateFields: PropTypes.func,
        children: PropTypes.func.isRequired,
    }

    constructor(props: FormBlockProps) {
        super(props)
        const { form, getForm } = this.props
        getForm(form)
    }

    componentDidMount() {
        const { form, validateFields } = this.props
        const data = this.props.data || {}
        this.validateFieldsAndScroll = form.validateFieldsAndScroll
        validateFields(this.validateFieldsAndScroll)
        Object.keys(data).forEach((key) => {
            if (data[key] === null) {
                delete data[key]
            }
        })
        form.setFieldsValue(data)
    }

    componentWillReceiveProps(nextProps: FormBlockProps) {
        const data = nextProps.data || {}
        if (nextProps.data !== this.props.data) {
            if (!nextProps.data) {
                setTimeout(() => {
                    nextProps.form.resetFields()
                }, 0)
                return
            }
            setTimeout(() => {
                Object.keys(data).forEach((key) => {
                    if (data[key] === null) {
                        delete data[key]
                    }
                })
                nextProps.form.setFieldsValue(data)
            }, 0)
        }
    }

    componentWillUnmount() {
        this.validateFieldsAndScroll['[[clearMark]]'] = true
    }

    render() {
        return this.props.children(this.props.form)
    }
}

export default Form.create()(FormBlock)
