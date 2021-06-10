import React from 'react'
import { Button, Modal } from 'antd'
import SearchableTable from 'src/common/SearchableTable'
import { api } from 'src/assets/utils/api'
import OneshotModal from 'src/common/OneshotModal'
import PickupDetail from 'src/components/PickupDetail'
import PickupCreate from './component/PickupCreate'

class Pickup extends React.Component {
    constructor() {
        super()
        this.state = {
            refreshCounter: 0,
            rejectMsg: '',
            showPickupCreate: false,
            wareHouse: [],
        }
        this.doAutid = this.doAutid.bind(this)
    }

    componentWillMount() {
        this.getBankTypes()
    }

    getBankTypes() {
        api.get('/web-ware-house/list').then((res) => {
            if (res.code === 0) {
                res.data.list.forEach((item) => {
                    item.value = item.bizUuid
                    item.label = item.warehouseName
                })
                this.setState({
                    wareHouse: res.data.list,
                })
            } else {
                if (res.code === -3) { return }
                Modal.error({
                    title: '错误',
                    content: res.message || res.msg,
                    okText: '确定',
                })
            }
        })
    }

    doAutid({ bizUuid, id }, status) {
        const params = {
            bizUuid,
            id,
            msg: this.state.rejectMsg || '通过',
            status,
        }
        return api.put('/web-pick/check', params).then((res) => {
            if (res.code === 0) {
                this.setState((state) => ({
                    refreshCounter: state.refreshCounter + 1,
                    rejectMsg: '',
                }))
                Modal.success({
                    title: '操作成功！',
                    okText: '确定',
                })
            } else {
                if (res.code === -3) { return }
                Modal.error({
                    title: '错误',
                    content: res.message || res.msg,
                    okText: '确定',
                })
            }
        })
    }

    render() {
        const formItems = [
            {
                label: '提货日期',
                type: 'DatePicker',
                name: 'pickTime',
            },
            {
                label: '提货仓库',
                type: 'Select',
                name: 'warehouseUuid',
                props: {
                    style: { width: 100 },
                    allowClear: true,
                    options: this.state.wareHouse,
                },
            },
            {
                label: '申请人',
                type: 'Input',
                name: 'applicantName',
            },
            {
                label: '状态',
                type: 'Select',
                name: 'status',
                props: {
                    style: { width: 150 },
                    allowClear: true,
                    options: [
                        { value: '14-0', label: '待内部审核' },
                        { value: '14-1', label: '内部审核不通过' },
                        { value: '14-2', label: '待资金方审核' },
                        { value: '14-3', label: '资金方审核不通过' },
                        { value: '14-4', label: '审核通过' },
                    ],
                },
            },
        ]
        const mainFields = [
            {
                label: '提货单编号',
                type: 'InputSearch',
                name: 'pickNumber',
            },
        ]
        const columns = [
            {
                title: '提货单编号',
                dataIndex: 'pickNumber',
                width: 220,
                render: (text) => <code>{text}</code>,
            },
            {
                title: '提货日期',
                dataIndex: 'pickTime',
            },
            {
                title: '申请人',
                dataIndex: 'applicantName',
            },
            {
                title: '提货仓库',
                dataIndex: 'warehouseName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (value) => window.enums.getRender('deliveryStatus')(value),
            },
            {
                title: '操作',
                render: (record) => (
                    <Button
                        type="link"
                        onClick={() => OneshotModal.show({
                            title: '提货详情',
                            width: 800,
                            footer: null,
                            content: <PickupDetail record={record} />,
                        })}
                    >详情
                    </Button>
                ),
            },
        ]
        return (
            <>
                <SearchableTable
                    searchURL="/web-pick/all-list"
                    fields={formItems}
                    mainFields={mainFields}
                    attachSequence
                    columns={columns}
                    refreshCounter={this.state.refreshCounter}
                    tableLayout="auto"
                    rowKey="pickNumber"
                    extra={() => (
                        <Button type="primary" onClick={() => this.props.history.push('/pickup-create')}>提货申请</Button>
                    )}
                />
                {
                    this.state.showPickupCreate
                        ? (
                            <PickupCreate
                                visible={this.state.showPickupCreate}
                                onCancel={() => this.setState({ showPickupCreate: false })}
                            />
                        ) : ''
                }
            </>
        )
    }
}
export default Pickup
