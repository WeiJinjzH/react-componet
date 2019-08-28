import { Modal, Spin } from 'antd'
import React, { Component } from 'react'

interface PreviewImageModalProps {
    params: { href: string; };
    onDestroy: () => void;
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
        const { href } = this.props.params
        const showFooter = href.slice(-4) === '.png'
        return (
            <Modal
                title={(<div style={{ margin: '-5px 0' }}>图片预览</div>)}
                visible={this.state.visible}
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
                onCancel={() => { this.setState({ visible: false }) }}
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
                            Modal.info({ title: '图片加载失败' })
                            this.props.onDestroy()
                        }}
                    />
                    { this.state.loading && <div style={{ height: 108, width: 192 }} />}
                </Spin>
            </Modal>
        )
    }
}

export default PreviewImageModal
