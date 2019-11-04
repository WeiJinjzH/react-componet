import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import utils from 'src/utils'
import './index.less'

interface TextButtonProps {
    /** 是否可小窗口预览, 默认值 true */
    canPreview?: boolean;
    download?: any;
    href?: string;
    className?: string;
    title?: string;
    style?: React.CSSProperties;
    type?: 'button'|'submit'|'reset';
    disabled?: boolean;
    onClick?: React.MouseEventHandler
}

function handlePreview(href: string) {
    if (!utils.showPreviewModal({ href })) {
        window.open(href)
    }
}

class TextButton extends PureComponent<TextButtonProps> {
    static propTypes = {
        type: PropTypes.oneOf(['button', 'submit', 'reset']),
        canPreview: PropTypes.bool,
    }

    static defaultProps = {
        type: 'button',
        canPreview: true,
    }

    constructor(props: TextButtonProps) {
        super(props)
        if (props.href && props.onClick) {
            window.console.warn('TextButton: "href" 与 "onClick" 同时存在时, "onClick" 将不生效')
        }
    }

    render() {
        const {
            download, href, className, style, title, disabled, onClick, type, children, canPreview,
        } = this.props
        if (href) { // 当'href'为真值时, 元素渲染为<a>, 否则渲染为<button>
            return (
                <a
                    className={classNames({
                        'text-button': true,
                        'text-button-link': true,
                        'text-button-link--disabled': disabled,
                        [className]: !!className,
                    })}
                    onClick={(e) => {
                        if (!disabled && canPreview) {
                            handlePreview(href)
                        }
                        if (disabled || canPreview) {
                            e.preventDefault()
                            e.stopPropagation()
                        }
                    }}
                    style={style}
                    title={title}
                    href={href}
                    download={download}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.children}
                </a>
            )
        }
        return (
            <button
                className={classNames({
                    'text-button': true,
                    [className]: !!className,
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
