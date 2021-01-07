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
    showMesh: boolean;
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
            showMesh: true,
            loading: true,
            backgroundColor: '#eeeeee',
        }
    }

    render() {
        const { href, onCancel } = this.props
        let { visible } = this.state
        const { showMesh } = this.state
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
                    backgroundImage: showMesh ? `
                        linear-gradient(45deg, rgba(80, 80, 80, 0.25) 25%, transparent 25%, transparent 75%, rgba(80, 80, 80, 0.25) 75%),
                        linear-gradient(45deg, rgba(80, 80, 80, 0.25) 25%, transparent 25%, transparent 75%, rgba(80, 80, 80, 0.25) 75%)
                        ` : '',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px',
                }}
                onCancel={() => {
                    onCancel?.()
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
                                        border: color.value === this.state.backgroundColor ? '1px solid #00000050' : '1px solid #00000010',
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
                        <span style={{ marginLeft: 16 }}>网格</span>
                        <div
                            title="网格"
                            style={{
                                border: showMesh ? '1px solid #00000050' : '1px solid #00000080',
                                opacity: showMesh ? 1 : 0.5,
                                display: 'inline-block',
                                backgroundImage: showMesh ? `linear-gradient(90deg, #00000010 50%, rgba(0, 0, 0, 0) 50%),
                                        linear-gradient(#00000010 50%, rgba(0, 0, 0, 0) 50%)` : '',
                                backgroundSize: '4px 4px',
                                width: 16,
                                height: 16,
                                margin: 4,
                                borderRadius: 2,
                                cursor: 'pointer',
                            }}
                            onClick={() => { this.setState({ showMesh: !showMesh }) }}
                        />
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
