import { Table } from 'antd'
import classNames from 'classnames'
import EditableCell from './EditableCell'
import EditableRow from './EditableRow'
import './index.less'

const isRequired = (column) => {
    if (column.rules) {
        return column.rules.some((rule) => rule.required)
    }
    return false
}

const mergeSameRowValues = (values) => {
    const result = {}
    for (let i = 0; i < values.length; i += 1) {
        if (values[i].$key !== undefined) {
            result[values[i].$key] = { ...result[values[i].$key], ...values[i] }
        }
    }
    return Object.values(result)
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props)
        this.validateFields = this.validateFields.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.resetFields = this.resetFields.bind(this)
        this.validateFunctions = []
        this.resetFieldsFunctions = []
    }

    componentWillMount() {
        this.props.validateFields && this.props.validateFields(this.validateFields)
        this.props.resetFields && this.props.resetFields(this.resetFields)
    }

    componentDidUpdate() {
        this.validateFunctions = this.validateFunctions.filter((func) => !func['[[clearMark]]'])
        this.resetFieldsFunctions = this.resetFieldsFunctions.filter((func) => !func['[[clearMark]]'])
    }

    handleDelete(key) {
        const index = this.props.dataSource.findIndex((item) => key === item.key)
        this.props.dataSource.splice(index, 1)
        this.props.onChange && this.props.onChange(this.props.dataSource)
    }

    validateFields() {
        let hasFirstError = false
        const promises = this.validateFunctions.map((func) => {
            const promise = new Promise((resolve, reject) => {
                func((err, values) => {
                    if (!err) {
                        if (func.key !== undefined) values.$key = func.key
                        resolve(values)
                    } else {
                        if (!hasFirstError) {
                            hasFirstError = true
                            const errorKeys = Object.keys(err)
                            const firstErrorKey = errorKeys[0]
                            const firstErrorElement = this.editableTable.querySelector(`#${firstErrorKey}`)
                            if (firstErrorElement) {
                                setTimeout(() => {
                                    firstErrorElement.closest('td').scrollIntoView({ inline: 'start', behavior: 'smooth' })
                                }, 0)
                            }
                        }
                        reject(err)
                    }
                })
            })
            return promise
        })
        return Promise.all(promises).then((values) => mergeSameRowValues(values))
    }

    resetFields() {
        this.resetFieldsFunctions.forEach((func) => {
            func()
        })
    }

    render() {
        const { handleDelete } = this
        const { dataSource, className, onChange } = this.props
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        }
        const columns = this.props.columns.map((column) => ({
            ...column,
            render: (value, record, index) => column.render && column.render(value, record, { index, handleDelete }),
            title: isRequired(column) ? <span className="editable-column-label-required">{column.title}</span> : column.title,
            onCell: (record) => {
                let { componentProps } = column
                if (typeof column.componentProps === 'function') {
                    componentProps = column.componentProps(record)
                }
                return ({
                    record,
                    editable: column.editable,
                    dataIndex: column.dataIndex,
                    title: column.title,
                    rules: column.rules,
                    fieldDecoratorOptions: column.fieldDecoratorOptions,
                    type: column.type || 'Input',
                    customRender: column.customRender,
                    onEditingChange: column.onEditingChange,
                    renderUneditedCell: column.renderUneditedCell,
                    formatUneditedValue: column.formatUneditedValue,
                    ...componentProps,
                    onChange: (e, _record, cellRecord) => {
                        componentProps && componentProps.onChange && componentProps.onChange(
                            e && e.target ? e.target.value : e,
                            record,
                            cellRecord,
                        )
                        onChange && onChange(dataSource)
                    },
                })
            },
        }))
        return (
            <div
                ref={(ref) => { this.editableTable = ref }}
                onBlur={() => {
                    document.dispatchEvent(new Event('click'))
                }}
            >
                <Table
                    className={classNames({
                        'editable-table': true,
                        [className]: className,
                    })}
                    onRow={(({ key }) => ({
                        bindValidateFunc: (func) => {
                            if (key) { func.key = key }
                            this.validateFunctions.push(func)
                        },
                        bindResetFunc: (func) => {
                            this.resetFieldsFunctions.push(func)
                        },
                    }))}
                    pagination={false}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    footer={this.props.footer || null}
                    scroll={this.props.scroll}
                    style={this.props.style}
                />
            </div>
        )
    }
}

export default EditableTable
