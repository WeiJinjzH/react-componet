import React from 'react'
import AsyncWrapper from './index'

type getComponentCallback = (param: any, Comp: React.ComponentClass) => void

function asyncDecorator(getComponent: getComponentCallback) {
    return (props: any) => {
        const asyncWrapper = <AsyncWrapper {...props} routeItem={{ getComponent }} />
        return asyncWrapper
    }
}

export default asyncDecorator
