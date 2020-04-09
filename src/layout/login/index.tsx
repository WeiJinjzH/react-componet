import {
    Button, Col, Form, Input, Modal, Row,
} from 'antd'
import 'particles.js'
import React from 'react'
import { http } from 'src/utils'
import style from './login.less'

interface LoginState {
    isLoading: boolean;
    identifyKey: string;
    codeSrc: string;
}

class Login extends React.Component<any, LoginState> {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            codeSrc: '',
            identifyKey: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshValidCode = this.refreshValidCode.bind(this)
    }

    componentDidMount() {
        this.refreshValidCode()
        window.particlesJS.load('particles-js', '/static/build/config/particles.json')
    }

    handleSubmit(values) {
        const { isLoading, identifyKey } = this.state
        const { history, form } = this.props
        if (isLoading) {
            return
        }
        this.setState({ isLoading: true })
        values.identifyKey = identifyKey
        http.put('/manage/user/login', values).then((res) => {
            this.setState({ isLoading: false })
            if (res.code === 0) {
                const { data } = res
                localStorage.user = JSON.stringify(data) || ''
                sessionStorage.removeItem('menuData')
                history.push(res.data.showUrl || '/')
            } else if (res.code === -6) {
                this.setState({ isLoading: false })
                form.setFieldsValue({ inputCode: '' })
                Modal.warning({
                    title: '您还没有申请认证，请先认证',
                    content: res.msg,
                })
            } else {
                this.refreshValidCode()
                this.setState({ isLoading: false })
                form.setFieldsValue({ inputCode: '' })
                Modal.warning({
                    title: '登陆失败',
                    content: res.msg,
                })
            }
        }).catch(() => {
            this.setState({ isLoading: false })
        })
    }

    refreshValidCode() {
        http.get(`/manage/identify/generator?time=${new Date().getTime()}`).then((res) => {
            if (res.code === 0) {
                let { dataCode: codeSrc } = res.data
                if (!codeSrc.includes('.png')) {
                    codeSrc = `data:image/png;base64,${codeSrc}`
                }
                this.setState({ codeSrc, identifyKey: res.data.identifyKey })
            } else {
                Modal.warning({
                    title: '获取验证码失败',
                    content: res.msg,
                })
            }
        })
    }

    render() {
        const { codeSrc, isLoading } = this.state
        // const { form } = this.props
        // const { getFieldDecorator } = form
        return (
            <div id="particles-js" className={style.loginContainer}>
                <div className={style.loginText}>
                    <span className={style.title}>Demo</span>
                </div>
                <div className={style.loginForm}>
                    <h3 className={style.loginFormHeader}>登录</h3>
                    <Form onFinish={this.handleSubmit}>
                        <Form.Item
                            name="loginName"
                            rules={[{
                                required: true,
                                message: '请输入账户名',
                            }]}
                        >
                            <Input
                                // prefix={<Icon type="user" />}
                                allowClear
                                type="text"
                                placeholder="账户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                whitespace: false,
                                message: '请输入密码',
                            }]}
                        >
                            <Input
                                // prefix={<Icon type="lock" />}
                                allowClear
                                type="password"
                                autoComplete="new-password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item
                                    name="inputCode"
                                    rules={[{
                                        required: true,
                                        message: '请输入验证码',
                                    }]}
                                >
                                    <Input
                                        // prefix={<Icon type="lock" />}
                                        autoComplete="off"
                                        placeholder="验证码"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <div>
                                    {
                                        codeSrc && (
                                            <img
                                                className={style.captcha}
                                                onClick={this.refreshValidCode}
                                                onKeyDown={this.refreshValidCode}
                                                src={codeSrc}
                                                alt="验证码"
                                            />
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Button
                            className={style.loginBtn}
                            type="primary"
                            size="large"
                            htmlType="submit"
                        >
                            {isLoading ? '登录中...' : '立即登录'}
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login
