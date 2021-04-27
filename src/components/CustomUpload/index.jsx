import {
    Upload, message, Spin, Icon,
} from 'antd'
import './index.less'
import classnames from 'classnames'

const baseURL = utils.getBaseURL()

/**
 * 自定义样式上传组件, 仅支持单个文件上传
 *
 * 如结构相似可优先使用wrapperClassName属性做样式覆盖, 否则可使用children属性自定义渲染
 * */
const CustomUpload = ({
    children, // [function(file, remove) => ReactNode]
    onChange,
    action,
    accept,
    beforeUpload,
    disabled,
    readonly,
    file: _file, // readonly模式下, file属性支持URL[string]
    wrapperClassName,
    title,
    style,
}) => {
    const [fileList, setFileList] = React.useState(() => (_file ? [_file] : undefined))
    const [, update] = React.useState(() => {})

    React.useEffect(() => {
        if (_file?.status === 'done') {
            setFileList((_file) ? [_file] : undefined)
        }
        if (readonly && typeof _file === 'string') {
            let type
            const reg = _file.toLowerCase().match(/((^data:image\/)|(^data:application\/pdf)|(\.((jpg)|(png)|(jpeg)|(gif)|(bmp)|(pdf))$))/)
            if (!reg || !reg[1]) {
                type = 'unknow'
            } else if (reg[1] === 'pdf' || reg[1] === 'data:application/pdf') {
                type = 'application/pdf'
            } else {
                type = 'image/'
            }
            setFileList([{
                url: _file, previewURL: baseURL + _file, type, status: 'done',
            }])
        }
    }, [_file, readonly])

    let childrenNode
    if (typeof children === 'function') {
        childrenNode = children(fileList?.[0],
            (e) => {
                e?.stopPropagation && e.stopPropagation()
                setFileList(undefined)
            })
    } else {
        childrenNode = (
            <Spin spinning={fileList?.[0]?.status === 'uploading'}>
                <div
                    className={classnames({
                        'custom-upload': true,
                        'custom-upload-readonly': readonly,
                        'custom-upload--uploaded': fileList?.[0]?.status === 'done',
                        [wrapperClassName]: !!wrapperClassName,
                    })}
                    style={style}
                >
                    {
                        fileList?.[0] ? (
                            <>
                                {
                                    fileList[0].type?.includes('image/') ? (
                                        <img
                                            className="custom-upload-thumbnail"
                                            src={fileList?.[0]?.previewURL}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="custom-upload-file-preview">
                                            <i className="custom-upload-file-icon" />
                                            <div className="custom-upload-file-name">{fileList[0]?.name}</div>
                                        </div>
                                    )
                                }
                                {
                                    title ? (<div className="custom-upload-bottom-title">{title}</div>) : null
                                }
                            </>
                        ) : (
                            <>
                                <div className="custom-upload-add-icon">＋</div>
                                <div className="custom-upload-center-title">{title}</div>
                            </>
                        )
                    }
                    <div className="custom-upload-hover-layout" onClick={(event) => { event.stopPropagation() }}>
                        {
                            (fileList?.[0]?.type?.includes('image/') || fileList?.[0]?.type === 'application/pdf') && (
                                <Icon
                                    title="预览文件"
                                    className="custom-upload-preview-button"
                                    type="eye"
                                    fill="#fff"
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        event.preventDefault()
                                        utils.showPreviewModal({ href: fileList?.[0]?.previewURL })
                                    }}
                                />
                            )
                        }
                        <Icon
                            title="删除文件"
                            className="custom-upload-delete-button"
                            type="delete"
                            fill="#fff"
                            onClick={(event) => {
                                event.stopPropagation()
                                event.preventDefault()
                                setFileList(undefined)
                                onChange && onChange(undefined)
                            }}
                        />
                    </div>
                </div>
            </Spin>
        )
    }

    if (readonly) {
        return (
            <div className="custom-upload-wrapper">
                {childrenNode}
            </div>
        )
    }

    return (
        <div className="custom-upload-wrapper">
            <Upload
                action={action || `${baseURL}/upload/file-upload`}
                accept={accept}
                multiple={false}
                disabled={disabled}
                showUploadList={false}
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={({ fileList: _fileList, file }) => {
                    _fileList.length = 0
                    if (file.status === 'error') {
                        message.error(`文件: ${file.name} 上传失败`)
                    }
                    if (file.status === 'error' || !file.status) {
                        setFileList(undefined)
                        onChange && onChange(undefined)
                        return
                    }
                    if (file.status === 'done') {
                        if (file.response.code === 0) {
                            file.url = file.response.data.url
                            const reader = new FileReader()
                            reader.addEventListener('load', () => {
                                file.previewURL = reader.result
                                update({})
                            })
                            reader.readAsDataURL(file.originFileObj)
                        } else {
                            message.error(file.response.msg)
                            setFileList(undefined)
                            onChange && onChange(undefined)
                            return
                        }
                    }
                    _fileList.push(file)
                    setFileList(_fileList)
                    onChange && onChange(file)
                    update({})
                }}
            >
                {childrenNode}
            </Upload>
        </div>
    )
}

export default CustomUpload
