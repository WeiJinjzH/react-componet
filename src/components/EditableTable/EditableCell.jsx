import { Form } from 'antd'

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
                    <Form.Item
                        shouldUpdate={(prevValues, nextValues) => prevValues[dataIndex] !== nextValues[dataIndex]}
                        name={undefined}
                        noStyle
                    >
                        {
                            () => {
                                const wrapper = (fieldNode) => {
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
                                    return dataIndex ? (
                                        <Form.Item
                                            name={dataIndex}
                                            noStyle
                                            {...fieldDecoratorOptions}
                                        >
                                            {node}
                                        </Form.Item>
                                    ) : node
                                }
                                let customNode
                                if (dataIndex) {
                                    customNode = render(record[dataIndex], record, index, wrapper)
                                } else {
                                    customNode = render(record, index, wrapper)
                                }
                                return wrapper.USING_WRAPPER_FLAG ? customNode : wrapper(customNode)
                            }
                        }
                    </Form.Item>
                </td>
            )
        }

        return (
            <td {...restProps}>
                <FormItem
                    shouldUpdate={(prevValues, nextValues) => prevValues[dataIndex] !== nextValues[dataIndex]}
                    style={{ margin: 0 }}
                    name={undefined}
                >
                    {
                        () => (dataIndex ? (
                            <Form.Item
                                shouldUpdate={(prevValues, nextValues) => prevValues[dataIndex] !== nextValues[dataIndex]}
                                name={dataIndex}
                                noStyle
                                {...fieldDecoratorOptions}
                            >
                                <span>{record[dataIndex]}</span>
                            </Form.Item>
                        ) : restProps.children)
                    }
                </FormItem>
            </td>
        )
    }
}

export default EditableCell
