import { Form } from 'antd'
import EditableContext from './EditableContext'

const FormItem = Form.Item

class EditableCell extends React.Component {
    render() {
        const {
            dataIndex,
            title,
            record,
            index,
            rules,
            getData,
            searchURL,
            width,
            render,
            fieldDecoratorOptions,
            ...restProps
        } = this.props

        if (render) {
            return (
                <td {...restProps}>
                    <EditableContext.Consumer>
                        {(form) => {
                            const wrapper = (fieldNode, inlineWrap) => {
                                if (!wrapper.USING_WRAPPER_FLAG) wrapper.USING_WRAPPER_FLAG = true
                                let node = fieldNode
                                if (
                                    node === null
                                    || typeof node === 'string'
                                    || typeof node === 'number'
                                    || typeof node === 'undefined'
                                    || typeof node === 'boolean'
                                    || Array.isArray(node)
                                ) {
                                    node = <>{node}</>
                                }
                                return (
                                    <FormItem style={{ margin: 0, display: inlineWrap && 'inline-block' }}>
                                        {
                                            dataIndex ? form.getFieldDecorator(dataIndex, {
                                                rules,
                                                initialValue: record[dataIndex],
                                                ...fieldDecoratorOptions,
                                            })(node) : node
                                        }
                                    </FormItem>
                                )
                            }
                            let customNode
                            if (dataIndex) {
                                customNode = render(record[dataIndex], record, index, wrapper)
                            } else {
                                customNode = render(record, index, wrapper)
                            }
                            return wrapper.USING_WRAPPER_FLAG ? customNode : wrapper(customNode)
                        }}
                    </EditableContext.Consumer>
                </td>
            )
        }

        return (
            <td {...restProps}>
                <EditableContext.Consumer>
                    {(form) => (
                        <FormItem style={{ margin: 0 }}>
                            {
                                dataIndex ? form.getFieldDecorator(dataIndex, {
                                    rules,
                                    initialValue: record[dataIndex],
                                })(<span>{record[dataIndex]}</span>) : restProps.children
                            }
                        </FormItem>
                    )}
                </EditableContext.Consumer>
            </td>
        )
    }
}

export default EditableCell
