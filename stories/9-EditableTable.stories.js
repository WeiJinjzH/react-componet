/* eslint-disable react/display-name */
import { Button, Input, Table } from 'antd'
import React, { useState } from 'react'
import EditableTable from 'src/components/EditableTable'

export default {
    title: 'EditableTable',
    component: EditableTable,
    parameters: {
        componentSubtitle: '携带表单校验的可编辑表格组件',
    },
}

const data = [
    { column1: 111, column2: 222, id: 1 },
    { column1: 111, column2: 222, id: 2 },
    { column1: 111, column2: 222, id: 3 },
]

export const Basic = () => {
    /**
     * dataSource数据封装:
     * EditableTable.DataSource(originalDataSource?: Array, reservedFields?: Array)
     * originalDataSource(可选): 表格数据源
     * reservedFields(可选): dataSource.validateFields 结果输出时需要保留的字段
     *
     * P.S.: 暂不支持columns项中同时存在fixed及rules等表单校验相关属性共存
     */
    const [dataSource] = useState(new EditableTable.DataSource(data, ['id']))
    return (
        <div>
            <EditableTable
                dataSource={dataSource}
                columns={[
                    /** 基本用法 */
                    {
                        title: 'column1',
                        dataIndex: 'column1',
                    },
                    /** render基本用法 */
                    {
                        title: 'column2',
                        dataIndex: 'column2',
                        render: (value) => <span style={{ color: 'lightBlue' }}>{value}</span>,
                    },
                    /** 使用render中的wrapper参数包裹指定需要与表单数据双向绑定的组件 */
                    {
                        title: 'column3',
                        dataIndex: 'column3',
                        rules: [{ required: true, message: '必填' }],
                        width: 300,
                        render: (value, record, index, wrapper) => (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}
                            >
                                <span style={{ whiteSpace: 'nowrap', marginRight: 8 }}>something else</span>
                                { wrapper(<Input />) }
                            </div>
                        ),
                    },
                    /** 最外层是需要数据绑定的组件时, 无需使用wrapper参数包裹组件 */
                    {
                        title: 'column4',
                        dataIndex: 'column4',
                        width: 300,
                        rules: [{ required: true, message: '必填' }],
                        render: () => (<Input />),
                        /** 如组件需要内联的形式挂载时, 可往wrapper第二个参数传入true值 */
                        // render: (_v, _r, _i, wrapper) => wrapper(<DatePicker />, true),
                    },
                    {
                        title: '操作',
                        fixed: 'right',
                        width: 100,
                        render: (record) => (
                            <Button
                                type="link"
                                onClick={() => {
                                    /** 删除列 */
                                    dataSource.delete(record)
                                }}
                            >Delete
                            </Button>
                        ),
                    },
                ]}
            />
            <Button
                style={{ marginTop: 16, marginRight: 16 }}
                onClick={() => {
                    /** 新增列 */
                    const record = new EditableTable.Record({ id: Date.now() })
                    dataSource.push(record)
                }}
            >Add Row
            </Button>
            <Button
                style={{ marginTop: 16 }}
                onClick={() => {
                    /** 表单校验 */
                    dataSource.validateFields().then((values) => {
                        window.console.table(dataSource)
                        /** 如dataSource实例化时, 不传入第二个参数reservedFields, 则values不会包含"id"字段 */
                        window.console.table(values)
                    })
                }}
            >Submit
            </Button>
        </div>
    )
}

/** 表单联动 */
export const CoordinatedControls = () => {
    const [dataSource] = useState(new EditableTable.DataSource(data))
    return (
        <EditableTable
            dataSource={dataSource}
            columns={[
                {
                    title: 'column1',
                    dataIndex: 'column1',
                    width: '50%',
                },
                /** 使用record.setValues实现表单联动, setValues将同时修改record值及绑定的表单值 */
                {
                    title: 'column2',
                    dataIndex: 'column2',
                    width: '50%',
                    render: (value, record) => (
                        <Input
                            onChange={(e) => {
                                record.setValues({
                                    column1: `${e.target.value || 'empty'} from column2`,
                                })
                            }}
                        />
                    ),
                },
            ]}
        />
    )
}
