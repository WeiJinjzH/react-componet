import { Form, Table } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TableProps } from 'rc-table/lib/Table'
import React, {
    useCallback, useEffect, useLayoutEffect, useState,
} from 'react'
import { http } from 'src/utils'
import SearchBar from '../SearchBar'

interface Store {
    [name: string]: any
}

interface SearchableTableProps extends TableProps<Store> {
    searchFileds: any[];
    searchURL: string;
    rowKey: string;
    children?: React.ReactNode;
    form?: FormInstance;
    collapsible?: boolean;
    visibleFieldsCount?: number;
    initialValues?: Store;
    finishWithHiddenValues?: boolean;
    getForm?: (FormInstance) => void;
    onSearch?: (any) => void;
}

const SearchableTable = ({
    searchFileds,
    searchURL,
    columns,
    initialValues: _initialValues = {},
    rowKey,
    children,
    collapsible,
    visibleFieldsCount,
    form: _form,
    getForm,
    onSearch: _onSearch,
    finishWithHiddenValues,
    ...restTableProps
}: SearchableTableProps) => {
    const [dataSource, setDataSourch] = useState([])
    const [params, setParams] = useState()
    const [pageInfo, setPageInfo] = useState({ pageNum: 1, pageSize: 10 })
    const [initialValues] = useState(() => _initialValues)
    const [form] = Form.useForm(_form)

    const getData = useCallback((values?: Object) => {
        http.get(searchURL, { ...initialValues, ...values }).then((res) => {
            if (res.code === 0) {
                setDataSourch(res.data.list)
            }
        })
    }, [searchURL, initialValues])

    useLayoutEffect(() => {
        getForm && getForm(form)
    }, [getForm, form])

    useEffect(() => {
        getData()
    }, [getData])

    const onSearch = (values) => {
        setParams(values)
        _onSearch && _onSearch({ ...values, ...pageInfo })
        getData({ ...values, ...pageInfo })
    }

    const onChange = (pageNum, pageSize) => {
        setPageInfo({ pageNum, pageSize })
        getData({ ...params, pageNum, pageSize })
    }

    const onShowSizeChange = (pageNum, pageSize) => {
        setPageInfo({ pageNum: 1, pageSize })
        getData({ ...params, pageNum: 1, pageSize })
    }

    return (
        <div className="searchable-table">
            <SearchBar
                style={{ marginBottom: children ? -24 : 24 }}
                form={form}
                fields={searchFileds}
                onSearch={onSearch}
                onReset={onSearch}
                initialValues={initialValues}
                collapsible={collapsible}
                visibleFieldsCount={visibleFieldsCount}
                finishWithHiddenValues={finishWithHiddenValues}
            >
                { children }
            </SearchBar>
            <Table
                style={{ backgroundColor: 'white', borderRadius: 4, padding: 24 }}
                columns={columns}
                dataSource={dataSource}
                rowKey={rowKey}
                pagination={{
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange,
                    showSizeChanger: true,
                    onShowSizeChange,
                }}
                {...restTableProps}
            />
        </div>
    )
}

export default SearchableTable
