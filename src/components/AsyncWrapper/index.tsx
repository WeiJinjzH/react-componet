
import React from 'react'
import { Spin } from 'antd'
import ErrorBoundary from 'src/components/error-boundary'

type getComponentCallback = (param: any, Comp: React.ComponentClass) => void

interface AsyncWrapperProps {
    routeItem: {
        getComponent: ({}, callback: getComponentCallback) => void;
    };
}

interface AsyncWrapperState {
    Comp?: React.ComponentClass;
    loading: boolean;
}

class AsyncWrapper extends React.Component<AsyncWrapperProps, AsyncWrapperState> {
    destroyed: boolean;

    constructor(props: AsyncWrapperProps) {
        super(props)
        this.state = {
            Comp: null,
            loading: false,
        }
    }

    componentDidMount() {
        const { routeItem } = this.props
        if (routeItem.getComponent) {
            setTimeout(() => {
                if (!this.destroyed) {
                    this.setState({ loading: true })
                }
            }, 100)
            routeItem.getComponent({}, (param, Comp) => {
                this.setState({ Comp })
            })
        }
    }

    componentWillUnmount() {
        this.destroyed = true
    }

    render() {
        const { Comp } = this.state
        if (Comp) {
            return (
                <ErrorBoundary>
                    <Comp {...this.props} />
                </ErrorBoundary>
            )
        }
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '100px',
                }}
            >
                <Spin spinning={this.state.loading} size="large" tip="正在加载页面资源..." />
            </div>
        )
    }
}

export default AsyncWrapper
