import { Button, Modal, Upload } from 'antd'
import React, { Component } from 'react'

const BASE_URL = utils.getBaseURL()

class UploadButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            fileList: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange({ file, fileList }) {
        if (file.status === 'uploading') {
            this.setState({ isLoading: true, fileList })
        } else if (file.status === 'done') {
            this.setState({ isLoading: false })
            const res = file.response
            if (res.code === -3) {
                utils.showSingleModal('error', {
                    title: '登录已失效，请重新登录',
                    okText: '确定',
                    onOk: () => {
                        window.location.href = '/#/login'
                    },
                })
                return
            }
            if (res.code === 0) {
                this.setState({ fileList: [] })
                this.props.onSuccess && this.props.onSuccess(res)
                this.props.onCancel && this.props.onCancel()
            } else if (res.details) {
                this.setState({
                    isLoading: false,
                    fileList: [],
                })
            } else {
                // 无details信息时，直接展示message字段
                Modal.error({
                    title: '导入失败',
                    content: res.msg,
                })
                this.setState({
                    isLoading: false,
                    fileList: [],
                })
            }
        } else if (file.status === 'error') {
            this.setState({
                isLoading: false,
                fileList: [],
            })
            Modal.error({
                title: '上传失败',
            })
        }
    }

    render() {
        const { onSuccess, action, ...buttonProps } = this.props
        return (
            <Upload
                action={BASE_URL + action}
                fileList={this.state.fileList}
                showUploadList={false}
                onChange={this.handleChange}
            >
                <Button
                    loading={this.state.isLoading}
                    {...buttonProps}
                >
                    {this.props.children ?? '导入文件'}
                </Button>
            </Upload>
        )
    }
}

export default UploadButton
