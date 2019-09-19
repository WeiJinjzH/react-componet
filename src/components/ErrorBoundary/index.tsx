import React from 'react'

const fundebug = require('fundebug-javascript')
require('fundebug-revideo')

fundebug.init({
    apikey: 'e133bf0841efbbfa0f26585bdfda36c8f4bd0af27b4db771ace81d10e0bbf015',
    silentHttp: true,
})

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

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        fundebug.notifyError(error, {
            metaData: {
                info,
            },
        })
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ textAlign: 'center' }}>组件出错。</div>
        }
        return this.props.children
    }
}

export default ErrorBoundary
