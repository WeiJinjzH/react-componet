import {
    Button, Input, Modal, Steps,
} from 'antd'
import React from 'react'
import { api } from 'src/assets/utils/api'
import FormBlockTransition from 'src/common/FormBlockTransition'
import SelectableModal from 'src/common/SelectableModal'
import EditableTable from 'src/components/EditableTable'
import TeCard from 'src/components/TeCard'
import MainLayoutContext from 'src/layout/main/MainLayoutContext'

const { TextArea } = Input

class PickupCreate extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            serialNumber: '',
            amount: 0,
            sum: 0,
            amountTotal: 0,
        }
        this.getStock = this.getStock.bind(this)
        this.goodsNumChange = this.goodsNumChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        const { setBreadcrumbItems } = this.context
        setBreadcrumbItems([
            { name: '资产管理' },
            { name: '存货管理', path: '/pick-up' },
            { name: '提货申请' },
        ])

        this.getStock()
    }

    getStock() {
        api.get('/web-pick/gen').then((res) => {
            if (res.code === 0) {
                this.setState({
                    serialNumber: res.data,
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

    documentChange(form, value) {
        this.setState({ documentDate: value })
    }

    pickChange(form, value) {
        this.setState({ pickTime: value })
    }

    goodsNumChange(value, _record) {
        const newData = [...this.state.dataSource]
        const index = newData.findIndex((item) => _record.commodityCode === item.commodityCode)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item,
            ..._record,
            goodsNum: parseFloat(value),
        })
        let sum = 0
        let amount = 0
        newData.forEach((child) => {
            if (child.goodsNum) {
                sum += child.goodsNum
                amount += parseFloat(child.goodsNum) * parseFloat(child.unitPrice)
            }
        })
        this.setState({ dataSource: newData, sum, amountTotal: amount })
        this.forceUpdate()
    }

    submit() {
        this.form.validateFields((err, values) => {
            if (err) {
                return
            }
            if (this.state.dataSource.length < 1) {
                Modal.info({
                    title: '请先选择商品！',
                })
                return
            }
            if (this.state.amountTotal > this.state.amount) {
                Modal.info({
                    title: `提货金额不能超过${this.state.amount}元`,
                })
                return
            }
            const newData = this.state.dataSource
            let goodsNumFlag = false
            newData.forEach((item) => {
                item.goodUuid = item.uuid
                item.goodsUnit = item.unit
                item.goodName = item.commodity
                item.price = item.unitPrice
                item.totalMoney = parseFloat(item.goodsNum) * parseFloat(item.unitPrice)
                if (!item.goodsNum) {
                    goodsNumFlag = true
                }
            })
            const arr = []
            values.pick.forEach((item) => {
                arr.push(item.uuid)
            })
            if (goodsNumFlag) {
                Modal.info({
                    title: '请先输入提货数量！',
                })
                return
            }
            const params = {
                ...values,
                pickList: arr,
                orderUuid: values.uuid,
                goodsRelDTOs: newData,
                warehouseUuid: arr.join(','),
                pickNumber: this.state.serialNumber,
            }
            this.setState({ submitting: true })
            api.post('/web-pick/apply', params).then((res) => {
                this.setState({ submitting: false })
                if (res.code === 0) {
                    Modal.success({
                        title: '创建成功',
                        onOk: () => {
                            this.props.history.goBack()
                        },
                    })
                    this.form.resetFields()
                    this.setState({ dataSource: [] })
                    this.getStock()
                } else {
                    if (res.code === -3) { return }
                    Modal.error({
                        title: '错误',
                        content: res.message || res.msg,
                        okText: '确定',
                    })
                }
            })
        })
    }

    render() {
        const columns = [
            {
                title: '商品编号',
                dataIndex: 'commodityCode',
            },
            {
                title: '商品名称',
                dataIndex: 'commodity',
            },
            {
                title: '规格',
                dataIndex: 'specification',
            },
            {
                title: '型号',
                dataIndex: 'model',
            },
            {
                title: '单位',
                dataIndex: 'unit',
            },
            {
                title: '数量',
                dataIndex: 'amount',
            },
            {
                title: '提货数量',
                dataIndex: 'goodsNum',
                editable: true,
                type: 'InputNumber',
                width: 120,
                rules: [{ required: true, message: '必填' }],
                componentProps: (record) => ({
                    onChange: (value, _record) => this.goodsNumChange(value, _record),
                    max: record.amount,
                    min: 1,
                }),
            },
            {
                title: '单价',
                dataIndex: 'unitPrice',
                render: (text) => utils.formatMoney(text, 2, '¥'),
            },
            {
                title: '金额',
                dataIndex: 'sum',
                render: (text, record) => utils.formatMoney(parseFloat(record.goodsNum) * parseFloat(record.unitPrice), 2, '¥'),
            },
            {
                title: '货位',
                dataIndex: 'storingLocation',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                editable: true,
                type: 'Input',
                width: 120,
                componentProps: () => ({
                    onChange: () => {
                        this.forceUpdate()
                    },
                }),
            },
        ]
        return (
            <div>
                <TeCard>
                    <Steps
                        labelPlacement="vertical"
                        size="small"
                        progressDot
                        current={0}
                        style={{ maxWidth: 500, margin: '0 auto 20px' }}
                    >
                        <Steps.Step title="填写提货信息" />
                        <Steps.Step title="内部审核" />
                        <Steps.Step title="完成" />
                    </Steps>
                </TeCard>
                <TeCard>
                    <FormBlockTransition
                        columnCount={2}
                        layout="inline"
                        getForm={(form) => { this.form = form }}
                        fields={[
                            {
                                label: '提货单编号',
                                key: 'pickNumber',
                                render: () => this.state.serialNumber,
                            },
                            // {
                            //     label: '提货仓库',
                            //     type: 'Select',
                            //     key: 'status',
                            //     props: {
                            //         style: { width: 170 },
                            //         options: window.enums.getOptions('deliveryStatus'),
                            //     },
                            // },
                            {
                                label: '单据日期',
                                name: 'documentDate',
                                type: 'DatePicker',
                                rules: [
                                    { required: true, message: '必填' },
                                ],
                                props: {
                                    disabledDate: (value) => value > this.state.pickTime,
                                },
                                onChange: (value) => this.documentChange(this.form, value),
                            },
                            {
                                label: '提货日期',
                                name: 'pickTime',
                                type: 'DatePicker',
                                rules: [
                                    { required: true, message: '必填' },
                                ],
                                props: {
                                    disabledDate: (value) => value < this.state.documentDate,
                                },
                                onChange: (value) => this.pickChange(this.form, value),
                            },
                            {
                                label: '仓单',
                                name: 'pick',
                                rules: [
                                    { required: true, message: '必填' },
                                ],
                                span: 24,
                                render: () => (
                                    <SelectableModal
                                        modalTitle="选择仓单"
                                        modalWidth={800}
                                        labelKey="receiptCode"
                                        sourceURL="/capital/warehouse-receipt/pick"
                                        rowKey="uuid"
                                        mode="radio"
                                        tableFormItems={[{ label: '仓单编号', type: 'Input', name: 'warehouseReceiptCode' }]}
                                        tableColumns={[
                                            {
                                                title: '仓单编号',
                                                dataIndex: 'receiptCode',
                                            },
                                            {
                                                title: '仓单价值',
                                                dataIndex: 'sum',
                                                render: (text) => utils.formatMoney(text, 2, '¥'),
                                            },
                                            {
                                                title: '仓单有效期',
                                                dataIndex: 'stockEndDate',
                                            },
                                            {
                                                title: '创建时间',
                                                dataIndex: 'createDate',
                                            },
                                            {
                                                title: '状态',
                                                dataIndex: 'baseStatus',
                                                render: (value) => window.enums.getRender('baseStatus')(value),
                                            },
                                        ]}
                                        onChange={(_values, keys) => {
                                            if (_values.length > 0) {
                                                api.get(`/web-pick/show-table-info/${keys.join(',')}`).then((res) => {
                                                    if (res.code === 0) {
                                                        this.setState({ dataSource: res.data })
                                                    } else {
                                                        if (res.code === -3) { return }
                                                        Modal.error({
                                                            title: '错误',
                                                            content: res.message || res.msg,
                                                            okText: '确定',
                                                        })
                                                    }
                                                })
                                                api.get(`/web-pick/warehouse-receipt/get-amount/${keys.join(',')}`).then((res) => {
                                                    if (res.code === 0) {
                                                        this.setState({ amount: res.data })
                                                    } else {
                                                        if (res.code === -3) { return }
                                                        Modal.error({
                                                            title: '错误',
                                                            content: res.message || res.msg,
                                                            okText: '确定',
                                                        })
                                                    }
                                                })
                                            } else {
                                                this.setState({
                                                    dataSource: [], amount: 0, sum: 0, amountTotal: 0,
                                                })
                                            }
                                        }}
                                    />
                                ),
                            },
                            {
                                label: '备注',
                                name: 'remark',
                                span: 24,
                                render: () => <TextArea style={{ width: 580 }} />,
                            },
                        ]}
                    />
                    <EditableTable
                        className="te-table-inline"
                        dataSource={this.state.dataSource}
                        columns={columns}
                        rowKey="uuid"
                    />
                    <div style={{ marginTop: 5, display: 'flex', width: '100%' }}>
                        <div style={{ flex: 1 }}>
                            当前仓单可提货价值不能超过{utils.formatMoney(this.state.amount, 2, '¥')}
                        </div>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                            合计提货数量: {this.state.sum}，合计提货金额: {utils.formatMoney(this.state.amountTotal, 2, '¥')}
                        </div>
                    </div>
                    <div style={{ margin: '30px auto', textAlign: 'center' }}>
                        <Button
                            type="primary-with-shadow"
                            style={{ width: 186 }}
                            size="large"
                            loading={this.state.submitting}
                            onClick={this.submit}
                        >提交
                        </Button>
                    </div>
                </TeCard>
            </div>
        )
    }
}
PickupCreate.contextType = MainLayoutContext
export default PickupCreate
