import React from 'react'
import { Alert } from 'antd'

class ErrorBoundary extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            error: undefined,
            errorInfo: undefined,
        }
    }

    componentDidCatch(error, errorInfo) {
        if (error?.name === 'ChunkLoadError' && window.sessionStorage.getItem('prevChunkError') !== error.request) {
            window.sessionStorage.setItem('prevChunkError', error.request)
            window.location.reload(true)
        } else {
            this.setState({ error, errorInfo })
        }
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Alert
                        message=""
                        type="error"
                        description={(
                            <div
                                style={{
                                    maxHeight: '50vh',
                                    overflow: 'auto',
                                    whiteSpace: 'pre-line',
                                    textAlign: 'left',
                                }}
                            >
                                <h1>组件出错</h1>
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </div>
                        )}
                    />
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
