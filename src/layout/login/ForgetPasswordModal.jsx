import { Button, Col, Divider, Modal, Row, Steps, Input, message, Icon } from 'antd'
import React, { Component } from 'react'
import renderForm from 'src/utils/render-form'
import FormBlock from 'src/components/FormBlock'
import { http } from 'src/utils/http'
import './login.less'

const { Step } = Steps

const handleConfirmPassword = (value, confirmValue, callback) => {
    if (value && value !== confirmValue) {
        callback('两次输入不一致！')
    }
    callback()
}

class ForgetPasswordModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            data: {},
        }
        this.sendSMS = this.sendSMS.bind(this)
        this.handleConfirmPassword = utils.debounce(handleConfirmPassword.bind(this), 500)
        this.submit = this.submit.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    submit() {
        this.setState({ submitting: true })
        http.post('/web-user/forget', this.state.data).then((res) => {
            this.setState({ submitting: false })
            if (res.code === 0) {
                message.success('密码修改成功')
                this.closeModal()
            } else {
                message.info(res.msg)
            }
        }).catch(() => {
            this.setState({ submitting: false })
        })
    }

    sendSMS({ loginName }) {
        http.get(`/web-user/send-msg/${loginName}`).then((res) => {
            if (res.code === 0) {
                message.success(res.data)
                this.setState({ interval: 60 })
                const timer = setInterval(() => {
                    this.setState({
                        interval: this.state.interval > 0 ? this.state.interval - 1 : 0,
                    })
                    if (this.state.interval <= 0) {
                        window.clearInterval(timer)
                    }
                }, 1000)
            } else {
                message.info(res.msg)
            }
        })
    }

    closeModal() {
        this.setState({
            step: 0,
            data: {},
        })
        this.props.onCancel()
    }

    renderStepContent(step) {
        switch (step) {
        case 0:
            return (
                <FormBlock data={this.state.data}>
                    {
                        form => (
                            <React.Fragment>
                                {
                                    renderForm([
                                        {
                                            label: '用户名',
                                            key: 'loginName',
                                            type: 'Input',
                                            option: {
                                                rules: [{ required: true, message: '必填' }],
                                            },
                                        },
                                        {
                                            label: '验证码',
                                            key: 'smsCode',
                                            option: {
                                                rules: [{ required: true, message: '必填' }],
                                            },
                                            render: value => (
                                                <Row type="flex" gutter={4}>
                                                    <Col style={{ flex: 1 }}>
                                                        <Input
                                                            value={value}
                                                            onChange={(e) => {
                                                                form.setFieldsValue({
                                                                    smsCode: e.target.value,
                                                                })
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                form.validateFields(['loginName'], (err, values) => {
                                                                    if (!err) {
                                                                        this.sendSMS(values)
                                                                    } else {
                                                                        message.info('请输入正确的用户名')
                                                                    }
                                                                })
                                                            }}
                                                            disabled={this.state.interval > 0}
                                                        >{this.state.interval > 0 ? `${this.state.interval}秒后重新获取` : '获取验证码'}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ),
                                        },
                                    ], form, {
                                        colSpan: 24,
                                        formItemLayout: {
                                            labelCol: { span: 7 },
                                            wrapperCol: { span: 15 },
                                        },
                                    })
                                }
                                <Row
                                    type="flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        justifyContent: 'space-between',
                                        padding: 10,
                                        width: '100%',
                                    }}
                                >
                                    <Col style={{ width: '50%', padding: 10 }}>
                                        <Button style={{ width: '100%' }} onClick={this.closeModal}>取消</Button>
                                    </Col>
                                    <Col style={{ width: '50%', padding: 10 }}>
                                        <Button
                                            style={{ width: '100%' }}
                                            type="primary"
                                            onClick={() => {
                                                form.validateFields((err, values) => {
                                                    if (!err) {
                                                        this.setState({
                                                            data: { ...this.state.data, ...values },
                                                            step: 1,
                                                        })
                                                    }
                                                })
                                            }}
                                        >下一步
                                        </Button>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )
                    }
                </FormBlock >
            )
        case 1:
            return (
                <FormBlock data={this.state.data}>
                    {
                        form => (
                            <React.Fragment>
                                {
                                    renderForm([
                                        {
                                            label: '新密码',
                                            key: 'password',
                                            type: 'Input',
                                            option: {
                                                rules: [{ required: true, message: '必填' }],
                                            },
                                            otherProps: {
                                                type: 'password',
                                            },
                                        },
                                        {
                                            label: '确认密码',
                                            key: 'passwordConfirm',
                                            type: 'Input',
                                            option: {
                                                rules: [{
                                                    required: true,
                                                    message: '请再次输入密码',
                                                }, {
                                                    validator: (rule, value, callback) => {
                                                        this.handleConfirmPassword(value, form.getFieldValue('password'), callback)
                                                    },
                                                }],
                                            },
                                            otherProps: {
                                                type: 'password',
                                            },
                                        },
                                    ], form, {
                                        colSpan: 24,
                                        formItemLayout: {
                                            labelCol: { span: 7 },
                                            wrapperCol: { span: 15 },
                                        },
                                    })
                                }
                                <Row
                                    type="flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        justifyContent: 'space-between',
                                        padding: 10,
                                        width: '100%',
                                    }}
                                >
                                    <Col style={{ width: '50%', padding: 10 }}>
                                        <Button
                                            style={{ width: '100%' }}
                                            disabled={this.state.submitting}
                                            onClick={() => {
                                                this.setState({
                                                    data: { ...this.state.data, ...form.getFieldsValue() },
                                                    step: 0,
                                                })
                                            }}
                                        >上一步
                                        </Button>
                                    </Col>
                                    <Col style={{ width: '50%', padding: 10 }}>
                                        <Button
                                            style={{ width: '100%' }}
                                            type="primary"
                                            loading={this.state.submitting}
                                            onClick={() => {
                                                form.validateFields((err, values) => {
                                                    if (!err) {
                                                        this.setState({
                                                            data: { ...this.state.data, ...values },
                                                        }, this.submit)
                                                    }
                                                })
                                            }}
                                        >提交
                                        </Button>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )
                    }
                </FormBlock >
            )
        case 2:
            return (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ margin: '60px 0' }}>
                        <Icon style={{ color: 'green', fontSize: 24, verticalAlign: 'middle' }} type="check-circle" />
                        <span style={{ fontSize: 16, marginLeft: 10, verticalAlign: 'middle' }}>密码修改已完成</span>
                    </div>
                    <Button
                        style={{ width: 100 }}
                        type="primary"
                        onClick={this.closeModal}
                    >完成
                    </Button>
                </div>
            )
        default:
            return null
        }
    }

    render() {
        return (
            <Modal
                styleName="forget-password-form"
                width={320}
                getContainer={() => document.getElementById('app')}
                title="忘记密码"
                destroyOnClose
                visible={this.props.visible}
                onOk={this.submitRegister}
                onCancel={this.closeModal}
                bodyStyle={{ padding: 0, height: '100%' }}
                footer={null}
            >
                <Steps style={{ padding: 10 }} size="small" current={this.state.step}>
                    <Step title="账户确认" />
                    <Step title="修改密码" />
                    <Step title="完成" />
                </Steps>
                <Divider style={{ margin: '0 0 24px 0' }} />
                {
                    this.renderStepContent(this.state.step)
                }
            </Modal>
        )
    }
}

export default ForgetPasswordModal
