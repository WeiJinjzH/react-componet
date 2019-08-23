import {
    Button, Col, Form, Icon, Input, Modal, Row,
} from 'antd'
import 'particles.js'
import React from 'react'
import { http } from 'src/utils'
import './login.less'

const FormItem = Form.Item

class Login extends React.Component {
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

    handleSubmit(e) {
        const { isLoading, identifyKey } = this.state
        const { history, form } = this.props
        e.preventDefault()
        if (isLoading) {
            return
        }
        form.validateFields((errors, values) => {
            if (errors) {
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
        })
    }

    refreshValidCode() {
        http.get(`/manage/identify/generator?time=${new Date().getTime()}`).then((res) => {
            if (res.code === 0) {
                this.setState({ codeSrc: res.data.dataCode, identifyKey: res.data.identifyKey })
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
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <div id="particles-js" styleName="login-container">
                <div styleName="login-text">
                    <span styleName="baas">Demo</span>
                </div>
                <div styleName="login-form">
                    <h3 styleName="login-form-header">登录</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {
                                getFieldDecorator('loginName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入账户名',
                                    }],
                                })(<Input
                                    prefix={<Icon type="user" />}
                                    allowClear
                                    type="text"
                                    placeholder="账户名"
                                />)
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        whitespace: false,
                                        message: '请输入密码',
                                    }],
                                })(<Input
                                    prefix={<Icon type="lock" />}
                                    allowClear
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="密码"
                                />)
                            }
                        </FormItem>
                        <Row gutter={8}>
                            <Col span={16}>
                                <FormItem>
                                    {
                                        getFieldDecorator('inputCode', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入验证码',
                                                },
                                            ],
                                        })(<Input
                                            prefix={<Icon type="lock" />}
                                            autoComplete="off"
                                            placeholder="验证码"
                                        />)
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <div>
                                    {
                                        codeSrc && (
                                            <img
                                                styleName="cod"
                                                onClick={this.refreshValidCode}
                                                onKeyDown={this.refreshValidCode}
                                                src={`data:image/png;base64,${codeSrc}`}
                                                alt="验证码"
                                            />
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Button
                            styleName="login-btn"
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

export default Form.create()(Login)
