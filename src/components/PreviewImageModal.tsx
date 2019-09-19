import { Modal, Spin } from 'antd'
import React, { Component } from 'react'

interface PreviewImageModalProps {
    href: string;
    visible?: boolean;
    onCancel?: () => void;
    onDestroy?: () => void;
}

interface PreviewImageModalState {
    visible: boolean;
    loading: boolean;
    backgroundColor: string;
}

const presetBackgroundColors = [
    { title: '#FFFFFF', value: 'white' },
    { title: '#EEEEEE', value: '#eeeeee' },
    { title: '#000000', value: 'black' },
]

class PreviewImageModal extends Component<PreviewImageModalProps, PreviewImageModalState> {
    constructor(props: PreviewImageModalProps) {
        super(props)
        this.state = {
            visible: true,
            loading: true,
            backgroundColor: '#eee',
        }
    }

    render() {
        const { href, onCancel } = this.props
        let { visible } = this.state
        /** 当图片为png格式时, 启用背景色切换功能 */
        const showFooter = href.slice(-4).toLowerCase() === '.png'
        /* 存在visible属性时, 组件为可控组件 */
        if ('visible' in this.props) {
            visible = this.props.visible
        }
        return (
            <Modal
                title={(<div style={{ margin: '-5px 0' }}>图片预览</div>)}
                visible={visible}
                destroyOnClose
                centered
                closable={false}
                style={{ maxWidth: '80vw' }}
                width="auto"
                bodyStyle={{
                    padding: 0,
                    maxHeight: '80vh',
                    overflow: 'auto',
                    backgroundColor: this.state.backgroundColor,
                }}
                onCancel={() => {
                    onCancel && onCancel()
                    this.setState({ visible: false })
                }}
                afterClose={this.props.onDestroy}
                footer={showFooter ? (
                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <span>背景色: </span>
                        {
                            presetBackgroundColors.map((color) => (
                                <div
                                    key={color.value}
                                    title={color.title}
                                    style={{
                                        border: '1px solid grey',
                                        display: 'inline-block',
                                        backgroundColor: color.value,
                                        width: 16,
                                        height: 16,
                                        margin: 4,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => { this.setState({ backgroundColor: color.value }) }}
                                />
                            ))
                        }
                    </div>
                ) : null}
            >
                <Spin spinning={this.state.loading} size="large" tip="图片加载中……">
                    <img
                        src={href}
                        style={{ width: '100%' }}
                        alt=""
                        onLoad={() => { this.setState({ loading: false }) }}
                        onError={() => {
                            setTimeout(() => {
                                Modal.info({
                                    title: '图片加载失败',
                                    centered: true,
                                    onOk: this.props.onCancel || this.props.onDestroy,
                                })
                            }, 400)
                        }}
                    />
                    { this.state.loading && <div style={{ height: 108, width: 192 }} />}
                </Spin>
            </Modal>
        )
    }
}

export default PreviewImageModal
