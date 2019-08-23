import { Modal } from 'antd'
import React, { Component } from 'react'

interface PreviewPDFModalProps {
    params: {
        href: string;
    };
    onDestroy: () => void;
}

interface PreviewPDFModalState {
    visible: boolean;
}

class PreviewPDFModal extends Component<PreviewPDFModalProps, PreviewPDFModalState> {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
        }
    }

    render() {
        const { href } = this.props.params
        return (
            <Modal
                visible={this.state.visible}
                destroyOnClose
                bodyStyle={{ width: '100%', height: '80vh' }}
                onCancel={() => { this.setState({ visible: false }) }}
                afterClose={this.props.onDestroy}
                footer={null}
            >
                <iframe
                    title="previewer"
                    style={{ width: '100%', height: '100%' }}
                    src={href}
                />
            </Modal>
        )
    }
}

export default PreviewPDFModal
