import {
    Form, Icon, Input, InputNumber,
} from 'antd'
import classNames from 'classnames'
import SearchInput from 'src/common/SearchInput'
import EditableContext from './EditableContext'

const FormItem = Form.Item

class EditableCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
        }
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.save = this.save.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record !== this.props.record) {
            this.form && this.form.setFieldsValue(nextProps.record)
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true)
        }
    }

    async handleClickOutside(e) {
        if (this.input?.pressed) { return }
        const { editing } = this.state
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            const result = await this.save()
            result && document.removeEventListener('click', this.handleClickOutside, true)
        }
    }

    toggleEdit() {
        const editing = !this.state.editing
        const { onEditingChange } = this.props
        this.setState({ editing }, () => {
            onEditingChange && onEditingChange(editing)
            if (editing) {
                document.addEventListener('click', this.handleClickOutside, true)
                this.input && this.input.focus()
                if (this.input) {
                    const { input: inputNode } = this.input.inputNumberRef || this.input
                    inputNode.onmousedown = () => {
                        this.input.pressed = true
                        const mouseup = () => {
                            setTimeout(() => {
                                this.input.pressed = false
                            }, 0)
                            document.removeEventListener('mouseup', mouseup, true)
                        }
                        document.addEventListener('mouseup', mouseup, true)
                    }
                }
            }
        })
    }

    save() {
        const { record, dataIndex } = this.props
        return new Promise((resolve) => {
            this.form.validateFields([dataIndex], (error, values) => {
                if (error && error[dataIndex]) {
                    resolve(false)
                    return
                }
                Object.assign(record, values)
                this.toggleEdit()
                resolve(true)
            })
        })
    }

    render() {
        const { editing } = this.state
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            rules,
            render,
            getData,
            searchURL,
            width,
            showIcon = true,
            customRender,
            renderUneditedCell,
            formatUneditedValue,
            onEditingChange,
            showEmptyCell = false,
            fieldDecoratorOptions,
            ...restProps
        } = this.props

        const icon = showIcon ? (
            <Icon
                type="edit"
                style={!editing && record[dataIndex] !== undefined ? {
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    fontSize: 18,
                    color: '#548af725',
                } : {
                    position: 'absolute',
                    right: 16,
                    lineHeight: '32px',
                    height: 32,
                    fontSize: 18,
                    color: '#548af725',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={this.toggleEdit}
            />
        ) : null

        let uneditedCell
        if (typeof renderUneditedCell === 'function') {
            uneditedCell = renderUneditedCell(record[dataIndex], record)
        } else {
            uneditedCell = renderUneditedCell ?? (
                <div
                    className={classNames({
                        'editable-table-cell': true,
                        'editable-table-cell--empty': record[dataIndex] === undefined,
                    })}
                    style={{
                        minHeight: 32,
                        lineHeight: 1.6,
                    }}
                    onClick={this.toggleEdit}
                    onKeyDown={this.toggleEdit}
                    tabIndex="0"
                    role="button"
                    onFocusCapture={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        document.dispatchEvent(new Event('click'))
                        if (e.target?.classList?.contains('editable-table-cell')) {
                            this.toggleEdit()
                        }
                    }}
                >
                    { formatUneditedValue ? formatUneditedValue(record[dataIndex]) : record[dataIndex] }
                </div>
            )
        }

        if (customRender) {
            const wrapper = (fieldNode, frozeFlag) => {
                if (!frozeFlag) customRender.USING_WRAPPER_FLAG = true
                return (
                    <div>
                        {icon}
                        <EditableContext.Consumer>
                            {(form) => {
                                this.form = form
                                return (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules,
                                            initialValue: record[dataIndex],
                                            ...fieldDecoratorOptions,
                                        })((!showEmptyCell || editing) ? (
                                            fieldNode
                                        ) : (
                                            uneditedCell
                                        ))}
                                    </FormItem>
                                )
                            }}
                        </EditableContext.Consumer>
                    </div>
                )
            }
            const customNode = customRender(wrapper, editing, record)
            return (
                <td ref={(node) => { this.cell = node }} {...restProps}>
                    {
                        customRender.USING_WRAPPER_FLAG ? customNode : wrapper(customNode, true)
                    }
                </td>
            )
        }

        let edit
        switch (restProps.type) {
        case 'Input':
            edit = (
                <Input
                    autoComplete="off"
                    ref={(node) => { this.input = node }}
                    onPressEnter={this.save}
                />
            )
            break
        case 'SearchInput':
            edit = (
                <SearchInput
                    style={{ width: '100%', marginRight: -60 }}
                    onChange={(value, option, cellRecord) => {
                        record[dataIndex] = value
                        restProps.onChange && restProps.onChange(value, record, cellRecord)
                    }}
                    defaultInputValue={record[dataIndex]}
                    searchURL={searchURL || null}
                    autoComplete="off"
                    shape={restProps.shape}
                    autoFocus
                />
            )
            break
        case 'InputNumber':
            edit = (
                <InputNumber
                    style={{ width: '100%' }}
                    autoComplete="off"
                    ref={(node) => { this.input = node }}
                    onChange={(value) => {
                        record[dataIndex] = value
                        restProps.onChange && restProps.onChange(value, record)
                    }}
                    onPressEnter={this.save}
                    max={restProps.max}
                    min={restProps.min}
                />
            )
            break
        default:
            break
        }
        return (
            <td ref={(node) => { this.cell = node }} {...restProps}>
                {
                    editable ? (
                        <div>
                            {icon}
                            <EditableContext.Consumer>
                                {(form) => {
                                    this.form = form
                                    return (
                                        <FormItem style={{ margin: 0 }}>
                                            {form.getFieldDecorator(dataIndex, {
                                                rules,
                                                initialValue: record[dataIndex],
                                            })(editing ? (
                                                edit
                                            ) : (
                                                uneditedCell
                                            ))}
                                        </FormItem>
                                    )
                                }}
                            </EditableContext.Consumer>
                        </div>
                    ) : (restProps.children[2] === undefined ? record[dataIndex] : restProps.children)
                }
            </td>
        )
    }
}

export default EditableCell
