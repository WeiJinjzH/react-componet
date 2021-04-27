import { Icon, message, Upload } from 'antd'
import React, { Component } from 'react'
import './index.less'

const BASE_URL = utils.getBaseURL()

function handlePreview(file) {
    const url = file.previewUrl || file.url || file.thumbUrl
    if (url.match(/\.((jpg)|(png)|(jpeg)|(gif)|(bmp)|(pdf))$/)) {
        utils.showPreviewModal({ href: url })
    } else {
        window.open(url)
    }
}

class PhotoUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
        }
    }

    componentWillMount() {
        this.resetState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.resetState(nextProps)
    }

    /* fileList初始化数据时触发, 给state.fileList赋值, 组件只维护内部的fileList */
    resetState(props) {
        const { value } = props
        if (this.state.fileList.length === 0 && value) {
            this.state.fileList.push({
                uid: `-${value}`,
                name: value || '',
                shortUrl: BASE_URL + value || '',
                url: BASE_URL + value || '',
                title: value || '',
                status: 'success',
            })
        } else if (typeof value === 'undefined') {
            this.setState({ fileList: [] })
        }
    }

    render() {
        if (this.props.readonly && this.state.fileList.length === 0) {
            return this.props.emptyText || '-'
        }
        const uploadButton = (
            <Icon type="upload" />
        )
        return (
            <Upload
                className={`photo-upload${this.props.readonly ? ' photo-upload--readonly' : ''}`}
                action={BASE_URL + this.props.action}
                accept="image/*"
                listType="picture-card"
                multiple={false}
                fileList={this.state.fileList}
                beforeUpload={(file) => {
                    const isImage = !!~file.type.indexOf('image/')
                    if (!isImage) {
                        message.error('上传的文件必须是图片格式!')
                    }
                    return isImage
                }}
                onPreview={handlePreview}
                onChange={(fields) => {
                    let { fileList } = fields
                    fileList = fileList.filter((file) => {
                        if (file.status === 'error') {
                            message.error(`文件: ${file.name} 上传失败`)
                            return false
                        }
                        if (file.status === 'done') {
                            if (file.response.code === 0) {
                                file.url = file.response.data.url
                                file.previewUrl = BASE_URL + file.response.data.url
                                return true
                            }
                            message.error(file.response.msg)
                            return false
                        }
                        return true
                    })
                    this.setState({ fileList }) // 更新 state.fileList
                    if (this.props.onChange) {
                        fileList = fileList.filter((file) => (file.status === 'done' || file.status === 'success'))
                        if (fileList.length) {
                            this.props.onChange(fileList[0].url)
                        } else {
                            this.props.onChange(null)
                        }
                    }
                }}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: !this.props.readonly }}
            >
                {
                    this.props.readonly || this.state.fileList.length === 1 ? null : uploadButton
                }
            </Upload>
        )
    }
}

export default PhotoUpload
