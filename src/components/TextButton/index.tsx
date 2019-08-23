import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
    static defaultProps = {
        type: 'button',
        canPreview: true,
    }

    static propTypes = {
        type: PropTypes.oneOf(['button', 'submit', 'reset']),
        canPreview: PropTypes.bool,
    }

    render() {
        const {
            download,
            href,
            className,
            style,
            title,
            disabled,
            onClick,
            type,
            children,
        } = this.props
        if (href) { // href 不为空则以 <a> 渲染, 否则以 <button> 渲染
            return (
                <a
                    className={classNames({
                        'text-button': true,
                        'text-button--link': true,
                        'text-button--disabled': disabled,
                        [className]: true,
                    })}
                    onClick={(e) => {
                        const { canPreview } = this.props
                        if (canPreview) {
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
