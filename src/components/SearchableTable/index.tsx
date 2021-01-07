import {
    Form, message, Modal, Table,
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TableProps } from 'antd/lib/table/Table'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { http } from 'src/utils'
import SearchBar from 'src/components/SearchBar'
import { IProxyFormInstance } from '../FormBlock'

interface Store {
    [name: string]: any
}

interface SearchableTableProps extends TableProps<Store> {
    searchFileds?: any[];
    searchURL: string;
    rowKey?: string;
    children?: React.ReactNode;
    form?: FormInstance;
    collapsible?: boolean;
    visibleFieldsCount?: number;
    initialValues?: Store;
    attachSequence?: boolean;
    renderMiddleNode?: Function;
    paged?: boolean;
    dataPaths?: string[];
    refreshCounter?: number;
    extra?: React.ReactNode;
    getForm?: (form: IProxyFormInstance) => void;
    onSearch?: (any) => void;
}

const getDataSourceFromPaths = (_data, paths) => {
    if (typeof _data !== 'undefined' && paths && paths.length) {
        const path = paths.shift()
        const data = _data[path]
        return getDataSourceFromPaths(data, paths)
    }
    if (typeof _data === 'undefined') {
        window.console.error('无法正确获取数据, 检查响应数据是否是分页格式. 检查"paged"及"dataPaths"的配置.')
        return []
    }
    return _data
}

const SearchableTable = ({
    searchFileds,
    searchURL,
    columns: _columns,
    initialValues: _initialValues = {},
    rowKey,
    children,
    collapsible,
    visibleFieldsCount,
    form: _form,
    getForm,
    onSearch: _onSearch,
    attachSequence,
    size,
    extra,
    renderMiddleNode,
    paged = true, // 获取的数据是否是分页形式的数据
    dataPaths = paged ? ['data', 'list'] : ['data'], // 接口数据获取路径
    refreshCounter,
    ...restTableProps
}: SearchableTableProps) => {
    const [initialValues] = useState(() => _initialValues)
    const [dataSource, setDataSourch] = useState([])
    const [params, setParams] = useState({})
    const [pageInfo, setPageInfo] = useState({ pageNum: 1, pageSize: 10 })
    const [total, setTotal] = useState(0)
    const [form] = Form.useForm(_form) as [IProxyFormInstance]
    const [loading, setLoading] = useState(false)

    const columns = [..._columns]
    if (attachSequence) {
        const preWidth = (`${total}`.length * 8) + (size === 'small' ? 16 : 32)
        columns.unshift({ title: '序号', dataIndex: 'INTERNAL_SEQUENCE', width: preWidth > 60 ? preWidth : 60 })
    }

    const getData = (values = { ...initialValues, ...params, ...pageInfo }) => {
        setLoading(true)
        http.get(searchURL, values).then((res) => {
            setLoading(false)
            if (res.code === 0) {
                const data = getDataSourceFromPaths(res, [...dataPaths])
                if (attachSequence) {
                    data.forEach((item, index) => {
                        if (paged) {
                            item.INTERNAL_SEQUENCE = ((res.data.pageNum - 1) * res.data.pageSize) + index + 1
                        } else {
                            item.INTERNAL_SEQUENCE = index + 1
                        }
                    })
                }
                if (paged) {
                    setPageInfo({ pageNum: res.data.pageNum, pageSize: res.data.pageSize })
                    setTotal(res.data.total)
                } else {
                    setPageInfo({ pageNum: 1, pageSize: pageInfo.pageSize })
                    setTotal(data.length)
                }
                setDataSourch(data)
            } else {
                if (res.code === -3) { return }
                Modal.error({
                    title: '错误',
                    content: res.message || res.msg,
                    okText: '确定',
                })
            }
        }).catch((error) => {
            message.error(error)
            setLoading(false)
        })
    }

    useLayoutEffect(() => {
        getForm?.(form)
    }, [getForm, form])

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCounter])

    const onSearch = (values) => {
        setParams(values)
        _onSearch?.({ ...values, ...pageInfo })
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
                showReset
                initialValues={initialValues}
                // collapsible={collapsible}
                // visibleFieldsCount={visibleFieldsCount}
                extra={extra}
            >
                {children}
            </SearchBar>
            {renderMiddleNode && renderMiddleNode()}
            <Table
                style={{ backgroundColor: 'white', borderRadius: 4, padding: 24 }}
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                rowKey={rowKey || (attachSequence && 'INTERNAL_SEQUENCE')}
                size={size}
                pagination={{
                    showQuickJumper: true,
                    current: pageInfo.pageNum,
                    total,
                    showTotal: () => `共 ${total} 条`,
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
