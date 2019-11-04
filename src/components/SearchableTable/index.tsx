import React, { useState, useCallback, useEffect } from 'react'
import { Table, Form } from 'antd'
import { http } from 'src/utils'
import { TableProps } from 'antd/lib/table'
import SearchBar from '../SearchBar'

interface Store {
    [name: string]: any
}

interface SearchableTableProps extends TableProps<Store> {
    searchFileds: any[];
    searchURL: string;
    extra?: React.ReactNode;
    rowKey: string;
    initialValues?: Store;
}

const SearchableTable = ({
    searchFileds, searchURL, columns, initialValues = {}, rowKey, extra, ...restTableProps
}: SearchableTableProps) => {
    const [dataSource, setDataSourch] = useState([])
    const [params, setParams] = useState()
    const [pageInfo, setPageInfo] = useState({ pageNum: 1, pageSize: 10 })
    const [form] = Form.useForm()

    const getData = useCallback((values = {}) => {
        http.get(searchURL, { ...initialValues, ...values }).then((res) => {
            if (res.code === 0) {
                setDataSourch(res.data.list)
            }
        })
    }, [searchURL, initialValues])

    useEffect(() => {
        getData()
    }, [getData])

    const onSearch = (values) => {
        setParams(values)
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
        <div>
            <SearchBar
                form={form}
                fields={searchFileds}
                onSearch={onSearch}
                onReset={onSearch}
                initialValues={initialValues}
            >
                { extra }
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
