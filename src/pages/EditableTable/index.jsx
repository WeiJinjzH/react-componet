import { Table } from 'antd'
import classNames from 'classnames'
import EditableCell from './EditableCell'
import EditableRowWithForm from './EditableRowWithForm'
import EDTDataSource from './EDTDataSource'
import EDTRecord from './EDTRecord'
import './index.less'

const isRequired = (column) => {
    if (column.rules) {
        return column.rules.some((rule) => rule.required)
    }
    return false
}

class EditableTable extends React.Component {
    componentDidMount() {
        this.props.dataSource.bind(this, this.editableTable)
    }

    componentWillReceiveProps(nextProps) {
        const currentKey = this.props.dataSource.getKey()
        const nextKey = nextProps.dataSource.getKey()
        if (currentKey !== nextKey) {
            nextProps.dataSource.bind(this, this.editableTable)
        }
    }

    static DataSource = EDTDataSource

    static Record = EDTRecord

    render() {
        const {
            className,
            rowKey = (record) => record.getKey(),
            columns: rawColumns,
            dataSource,
            size = 'small',
            bordered = true,
            pagination = false,
            ...restProps
        } = this.props
        const components = {
            body: {
                row: EditableRowWithForm,
                cell: EditableCell,
            },
        }
        const columns = rawColumns.map((column) => ({
            ...column,
            render: undefined,
            title: isRequired(column) ? <span className="editable-column-label-required">{column.title}</span> : column.title,
            onCell: (record) => ({
                record,
                render: column.render,
                dataIndex: column.dataIndex,
                rules: column.rules,
                fieldDecoratorOptions: column.fieldDecoratorOptions,
            }),
        }))
        return (
            <div ref={(ref) => { this.editableTable = ref }}>
                <Table
                    className={classNames({
                        'editable-table': true,
                        [className]: className,
                    })}
                    rowClassName={() => 'editable-row'}
                    onRow={((record, index) => ({
                        record,
                        index,
                    }))}
                    rowKey={rowKey}
                    columns={columns}
                    dataSource={dataSource}
                    components={components}
                    size={size}
                    bordered={bordered}
                    pagination={pagination}
                    {...restProps}
                />
            </div>
        )
    }
}

export { EDTDataSource, EDTRecord }

export default EditableTable
