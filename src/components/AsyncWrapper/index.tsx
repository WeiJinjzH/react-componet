import React from 'react'
import { Spin } from 'antd'
import ErrorBoundary from 'src/components/ErrorBoundary'

export default class AsyncWrapper extends React.Component<any, any> {
    destroyed: boolean

    constructor(props) {
        super(props)
        this.state = {
            Comp: null,
            loading: false,
        }
    }

    componentWillMount() {
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
            return (<ErrorBoundary><Comp {...this.props} /></ErrorBoundary>)
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
