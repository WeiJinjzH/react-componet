import React, { useState, useCallback, useEffect } from 'react'
import { Table, Form } from 'antd'
import { http } from 'src/utils'
import SearchBar from '../SearchBar'

// eslint-disable-next-line object-curly-newline
const SearchableTable = ({ searchFileds, searchURL, columns, initialValues = {} }) => {
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

    return (
        <div>
            <SearchBar
                form={form}
                fields={searchFileds}
                onFinish={onSearch}
                onReset={onSearch}
                initialValues={initialValues}
            />
            <Table
                style={{ backgroundColor: 'white', padding: 24 }}
                columns={columns}
                dataSource={dataSource}
                rowKey="rowIndex" // TODO:
                pagination={{
                    onChange,
                }}
            />
        </div>
    )
}

export default SearchableTable
