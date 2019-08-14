import React from 'react'

interface ErrorBoundaryProps {
    children: React.ReactChild;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch() {
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ textAlign: 'center' }}>组件出错。</div>
        }
        return this.props.children
    }
}

export default ErrorBoundary
