import { Modal } from 'antd'
import React, { Component } from 'react'

interface PreviewPDFModalProps {
    href: string;
    visible?: boolean;
    onCancel?: () => void;
    onDestroy?: () => void;
}

interface PreviewPDFModalState {
    visible: boolean;
}

class PreviewPDFModal extends Component<PreviewPDFModalProps, PreviewPDFModalState> {
    constructor(props: PreviewPDFModalProps) {
        super(props)
        this.state = {
            visible: true,
        }
    }

    render() {
        const { href, onCancel } = this.props
        let { visible } = this.state
        if ('visible' in this.props) {
            visible = this.props.visible
        }
        return (
            <Modal
                visible={visible}
                destroyOnClose
                centered
                closable={false}
                width={1000}
                bodyStyle={{ width: '100%', height: '80vh' }}
                onCancel={() => {
                    onCancel?.()
                    this.setState({ visible: false })
                }}
                afterClose={this.props.onDestroy}
                footer={null}
            >
                <iframe
                    src={href}
                    title="previewer"
                    style={{ width: '100%', height: '100%' }}
                />
            </Modal>
        )
    }
}

export default PreviewPDFModal
