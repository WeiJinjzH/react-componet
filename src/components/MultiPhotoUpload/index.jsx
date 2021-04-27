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

class MultiPhotoUpload extends Component {
    constructor(props) {
        super(props)
        this.firstRender = true // 避免本地数据首次渲染被 [[__LOCK__]] 拦截
        const { value, format = {} } = props
        const fileList = []
        if (value && value.length) {
            value.forEach((file, i) => {
                fileList.push({
                    uid: format.uid ? file[format.uid] : `-${i}`,
                    name: file[format.name || format.url] || '',
                    shortUrl: file[format.shortUrl || format.url] || '',
                    url: file[format.url] || '',
                    previewUrl: BASE_URL + file[format.url] || '',
                    thumbUrl: BASE_URL + file[format.url] || '',
                    title: file[format.title || format.name || format.url] || '',
                    status: 'success',
                })
            })
            this.firstRender = false
        }
        this.state = {
            fileList,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { value, format = {} } = nextProps
        if (!this.firstRender && value && value['[[__LOCK__]]']) {
            return
        }
        this.firstRender = false
        const fileList = []
        if (value) {
            value.forEach((file, i) => {
                fileList.push({
                    uid: format.uid ? file[format.uid] : `-${i}`,
                    name: file[format.name || format.url || ''],
                    shortUrl: file[format.shortUrl || format.url || ''],
                    url: file[format.url || ''],
                    previewUrl: BASE_URL + file[format.url || ''],
                    thumbUrl: BASE_URL + file[format.url || ''],
                    title: file[format.title || format.name || format.url || ''],
                    status: 'success',
                })
            })
        }
        this.setState({ fileList })
    }

    render() {
        if (this.props.readonly && this.state.fileList.length === 0) {
            return this.props.emptyText || '-'
        }
        const uploadButton = (
            <Icon type="upload" />
        )
        const maxLength = this.props.maxLength || 3
        return (
            <React.Fragment>
                <Upload
                    className={`photo-upload${this.props.readonly ? ' photo-upload--readonly' : ''}`}
                    action={BASE_URL + this.props.action}
                    accept="image/*"
                    listType="picture-card"
                    multiple
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
                        if (fileList.length > maxLength) {
                            message.destroy()
                            message.info(`最多可以上传 ${maxLength} 个文件`)
                            fileList = fileList.slice(0, maxLength)
                        }
                        fileList = fileList.filter((file) => {
                            if (file.status === 'error') {
                                message.error(`文件: ${file.name} 上传失败`)
                                return false
                            }
                            if (file.status === 'done') {
                                if (file.response.code === 0) {
                                    file.url = file.response.data.url
                                    file.previewUrl = BASE_URL + file.response.data.url
                                    file.thumbUrl = BASE_URL + file.response.data.url
                                    return true
                                }
                                message.error(file.response.msg)
                                return false
                            }
                            return true
                        })
                        this.setState({ fileList }) // 更新 state.fileList
                        if (this.props.onChange && !fileList.some(item => item.status === 'uploading')) {
                            fileList = fileList.filter(file => (file.status === 'done' || file.status === 'success'))
                            const newFileList = []
                            newFileList['[[__LOCK__]]'] = true
                            if (this.props.format) {
                                const keys = Object.keys(this.props.format)
                                fileList.forEach((file) => {
                                    const newFile = {}
                                    keys.forEach((key) => {
                                        newFile[this.props.format[key]] = file[key]
                                    })
                                    newFileList.push(newFile)
                                })
                            } else {
                                fileList.forEach((file) => {
                                    newFileList.push(file)
                                })
                            }
                            this.props.onChange(newFileList, { fileList })
                        }
                    }}
                    showUploadList={{ showPreviewIcon: true, showRemoveIcon: !this.props.readonly }}
                >
                    {
                        this.props.readonly || (this.state.fileList && this.state.fileList.length >= maxLength) ? null : uploadButton
                    }
                </Upload>
            </React.Fragment>
        )
    }
}

export default MultiPhotoUpload
