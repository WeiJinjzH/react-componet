import {
    Icon, message, Progress, Upload, Button,
} from 'antd'
import Animate from 'rc-animate'
import React, { PureComponent } from 'react'
import './index.less'

const BASE_URL = utils.getBaseURL()

function handlePreview(file) {
    const url = file.previewUrl || file.url || file.thumbUrl
    if (!url) { return }
    if (url.match(/\.((jpg)|(png)|(jpeg)|(gif)|(bmp)|(pdf))$/)) {
        utils.showPreviewModal({ href: url })
    } else {
        window.open(url)
    }
}

class FilesUpload extends PureComponent {
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
                    thumbUrl: BASE_URL + file[format.url || ''],
                    title: file[format.title || format.name || format.url] || '',
                    status: 'success',
                })
            })
            this.firstRender = false
        }
        this.state = {
            fileList,
        }
        this.postChange = this.postChange.bind(this)
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

    postChange(rawFileList) {
        if (this.props.onChange && !rawFileList.some((item) => item.status === 'uploading')) {
            const fileList = rawFileList.filter((file) => (file.status === 'done' || file.status === 'success'))
            const newFileList = []
            this.firstRender = false
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
    }

    render() {
        if (this.props.readonly && this.state.fileList.length === 0) {
            return this.props.emptyText || '-'
        }
        const uploadButton = (
            <Button icon="upload" size="small" type="link">
                上传
            </Button>
        )
        const maxLength = this.props.maxLength || 3
        return (
            <>
                <div className="ant-upload files-upload">
                    <Animate
                        transitionName="ant-upload-animate"
                        component="div"
                        className="ant-upload-list ant-upload-list-text"
                    >
                        {
                            this.state.fileList.map((file) => (
                                <div key={file.uid} className={`ant-upload-list-item ant-upload-list-item-${file.status}`}>
                                    <div className="ant-upload-list-item-info">
                                        <span>
                                            <Icon type={file.status === 'uploading' ? 'loading' : 'paper-clip'} />
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ant-upload-list-item-name"
                                                title={file.name}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    handlePreview(file, e)
                                                }}
                                                href={file.previewUrl || file.thumbUrl}
                                            >{file.name}
                                            </a>
                                        </span>
                                    </div>
                                    {
                                        this.props.readonly ? null : (
                                            <Icon
                                                type="close"
                                                title="删除文件"
                                                onClick={() => {
                                                    const fileList = this.state.fileList.filter((item) => item.uid !== file.uid)
                                                    this.postChange(fileList)
                                                    this.setState({ fileList })
                                                }}
                                            />
                                        )
                                    }
                                    <Animate transitionName="fade" component="">
                                        {
                                            file.status === 'uploading' ? (
                                                <div className="ant-upload-list-item-progress" key="progress">
                                                    <Progress percent={file.percent} showInfo={false} strokeWidth={2} />
                                                </div>
                                            ) : null
                                        }
                                    </Animate>
                                </div>
                            ))
                        }
                    </Animate>
                </div>
                <Upload
                    action={BASE_URL + this.props.action}
                    multiple
                    accept={this.props.accept}
                    beforeUpload={this.props.beforeUpload}
                    showUploadList={false}
                    fileList={this.state.fileList}
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
                                    return true
                                }
                                message.error(file.response.msg)
                                return false
                            }
                            if (!('status' in file)) {
                                return false
                            }
                            return true
                        })
                        this.setState({ fileList }) // 更新 state.fileList
                        this.postChange(fileList)
                    }}
                    // showUploadList={{ showPreviewIcon: true, showRemoveIcon: !this.props.readonly }}
                >
                    {
                        (this.props.readonly || (this.state.fileList && this.state.fileList.length >= maxLength)) ? null : uploadButton
                    }
                </Upload>
            </>
        )
    }
}

export default FilesUpload
