import React from 'react'
import AsyncWrapper from './index'

function asyncDecorator(getComponent) {
    return (props) => {
        const asyncWrapper = <AsyncWrapper {...props} routeItem={{ getComponent }} />
        return asyncWrapper
    }
}

export default asyncDecorator
