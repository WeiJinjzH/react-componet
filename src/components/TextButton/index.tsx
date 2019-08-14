import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.less'

const BASE_URL = utils.getBaseURL()

const checkPreviewType = (href: string) => {
    const reg = href.match(/\.((jpg)|(png)|(jpeg)|(gif)|(bmp)|(pdf))$/)
    if (reg && reg[1]) {
        if (reg[1] === 'pdf') {
            return 'pdf'
        }
        return 'image'
    }
    return undefined
}

interface TextButtonProps {
    canPreview?: string; // 是否可小窗口预览, 默认值 true
    download?: any;
    href?: string;
    className?: string;
    title?: string;
    style?: React.StyleHTMLAttributes<HTMLButtonElement|HTMLAnchorElement>;
    type?: 'button'|'submit'|'reset';
    disabled?: boolean;
    onClick?: React.MouseEventHandler
}

interface TextButtonState {
    previewVisible: boolean;
    previewType?: 'image'|'pdf';
}

class TextButton extends PureComponent<TextButtonProps, TextButtonState> {
    static defaultProps = {
        type: 'button',
        canPreview: true,
    }

    static propTypes = {
        type: PropTypes.oneOf(['button', 'submit', 'reset']),
        canPreview: PropTypes.bool,
    }

    constructor(props: TextButtonProps) {
        super(props)
        this.state = {
            previewType: checkPreviewType(this.props.href),
            previewVisible: false,
        }
        this.handlePreview = this.handlePreview.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    componentWillReceiveProps(nextProps: TextButtonProps) {
        if (nextProps.href !== this.props.href || nextProps.canPreview !== this.props.canPreview) {
            const previewType = checkPreviewType(nextProps.href)
            this.setState({ previewType })
        }
    }

    handleCancel() {
        this.setState({ previewVisible: false })
    }

    handlePreview(href: string) {
        if (this.props.canPreview && this.state.previewType) {
            this.setState({
                previewVisible: true,
            })
        } else {
            window.open(href)
        }
    }

    render() {
        const {
            download,
            href,
            className,
            style,
            title,
            disabled,
            canPreview,
            onClick,
            type,
            children,
        } = this.props

        const { previewVisible, previewType } = this.state

        let previewURL = href
        if (href && href[0] === '/') {
            previewURL = BASE_URL + href
        }

        // href 不为空则以 <a> 渲染, 否则以 <button> 渲染
        if (href) {
            return (
                <React.Fragment>
                    <a
                        className={classNames({
                            'text-button': true,
                            'text-button--link': true,
                            'text-button--disabled': disabled,
                            [className]: true,
                        })}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (disabled) { return }
                            this.handlePreview(previewURL)
                        }}
                        style={style}
                        title={title}
                        href={previewURL}
                        download={download}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.children}
                    </a>
                    {
                        canPreview && previewType && (
                            <Modal
                                centered
                                wrapClassName="preview-modal"
                                visible={previewVisible}
                                footer={null}
                                onCancel={this.handleCancel}
                                zIndex={2000}
                                width={960}
                                bodyStyle={previewType === 'pdf' ? { width: '100%', height: '80vh' } : {}}
                            >
                                {
                                    previewType === 'pdf' ? (
                                        <iframe
                                            title="previewer"
                                            style={{ width: '100%', height: '100%' }}
                                            src={previewURL}
                                        />
                                    ) : (
                                        <img
                                            alt=""
                                            style={{ width: '100%' }}
                                            src={previewURL}
                                        />
                                    )
                                }
                            </Modal>
                        )
                    }
                </React.Fragment>
            )
        }
        return (
            <button
                className={classNames({
                    'text-button': true,
                    [className]: true,
                })}
                style={style}
                title={title}
                disabled={disabled}
                onClick={onClick}
                type={type}
            >
                {children || ''}
            </button>
        )
    }
}

export default TextButton
