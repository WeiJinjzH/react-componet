import {
    Button, message, Modal, notification,
} from 'antd'
import React, { Component } from 'react'
import svg1 from 'src/assets/images/login-decoration.svg'
import FormBlock from 'src/components/FormBlock'
import { http } from 'src/utils'
import style from './index.less'

class Login extends Component<any, any> {
    timer: number

    constructor(props: any) {
        super(props)
        this.state = {
            loading: false,
            coolingTime: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.sendSMSCode = this.sendSMSCode.bind(this)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    getUserInfo(form) {
        http.get('/web-user/get-user-info').then((res) => {
            this.setState({ loading: false })
            if (res.code === 0) {
                const fromURL = utils.getUrlParam('from', this.props.location?.search)
                const loginName = utils.getUrlParam('name', this.props.location?.search)
                localStorage.user = JSON.stringify(res.data) || ''
                sessionStorage.removeItem('menuData')
                if (res.data?.loginName === loginName) {
                    window.location.replace(fromURL)
                } else {
                    this.props.history.push(res.data.showUrl || '/')
                }
            } else {
                Modal.warning({
                    title: '登录失败',
                    content: res.msg,
                })
                form.setFieldsValue({ phoneCode: undefined })
            }
        }).catch((err) => {
            this.setState({ loading: false })
            throw err
        })
    }

    sendSMSCode(params) {
        http.get('/web-user/send-login-phone-code', params).then((res) => {
            if (res.code === 0) {
                this.setState({ coolingTime: 60 })
                message.success(res.data)
                this.timer = window.setInterval(() => {
                    this.setState({ coolingTime: this.state.coolingTime - 1 }, () => {
                        if (this.state.coolingTime <= 0) {
                            window.clearInterval(this.timer)
                        }
                    })
                }, 1000)
            } else {
                Modal.info({
                    title: '系统提示',
                    content: res.data || res.msg,
                })
            }
        })
    }

    handleSubmit(values, form) {
        this.setState({ loading: true })
        const params = values
        http.put('/web-user/login', params).then((res) => {
            if (res.code === 0) {
                this.getUserInfo(form)
            } else {
                this.setState({ loading: false })
                Modal.warning({
                    title: '登录失败',
                    content: res.msg,
                })
                form.setFieldsValue({ phoneCode: undefined })
            }
        }).catch((err) => {
            this.setState({ loading: false })
            throw err
        })
    }

    render() {
        return (
            <div className={style.login}>
                <div className={style.loginCard}>
                    <div className={style.loginDecoration}>
                        <img src={svg1} alt="" />
                    </div>
                    <div className={style.loginFormBox}>
                        <h3 className={style.loginFormTitle}>登录</h3>
                        <FormBlock
                            labelCol={7}
                            wrapperCol={13}
                            onFinish={this.handleSubmit}
                            fields={[
                                {
                                    label: '手机号',
                                    name: 'loginName',
                                    type: 'DebounceValidateInput',
                                    props: {
                                        allowClear: true,
                                        placeholder: '请输入手机号',
                                    },
                                    validateFirst: true,
                                    rules: [
                                        { required: true, message: '请输入手机号' },
                                        { pattern: /^1[34578]\d{9}$/, message: '手机号码有误' },
                                    ],
                                },
                                {
                                    label: '密码',
                                    name: 'password',
                                    type: 'InputPassword',
                                    rules: [{ required: true, message: '请输入密码' }],
                                    props: {
                                        allowClear: true,
                                    },
                                },
                                {
                                    label: '短信验证码',
                                    name: 'phoneCode',
                                    rules: [{ required: true, message: '必填' }],
                                    type: 'Input',
                                    props: {
                                        maxLength: 4,
                                        style: { width: 180, marginRight: 8 },
                                    },
                                    after: (v, values) => (
                                        <Button
                                            disabled={
                                                !values.loginName || !/^1[34578]\d{9}$/.test(values.loginName) || this.state.coolingTime > 0
                                            }
                                            onClick={() => {
                                                this.sendSMSCode({ phone: values.loginName })
                                            }}
                                        >
                                            {
                                                this.state.coolingTime > 0 ? `${this.state.coolingTime}秒后重试` : '发送验证码'
                                            }
                                        </Button>
                                    ),
                                },
                                {
                                    key: 'login-btn',
                                    wrapperCol: { offset: 9, span: 13 },
                                    compact: true,
                                    render: () => (
                                        <div>
                                            <Button
                                                size="large"
                                                type="primary"
                                                style={{ width: 184, marginTop: 16 }}
                                                loading={this.state.loading}
                                                htmlType="submit"
                                            >登录
                                            </Button>
                                            <div>
                                                <Button
                                                    style={{ marginLeft: -15 }}
                                                    type="link"
                                                    onClick={() => this.props.history.replace('/reset-password')}
                                                >忘记密码？
                                                </Button>
                                            </div>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
