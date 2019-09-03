import React from 'react'
import { Result, Button } from 'antd'

const Error403 = (props) => (
    <Result
        status="403"
        title="403"
        subTitle="很抱歉，您无权限访问此页面。"
        extra={(
            <Button
                type="primary"
                onClick={() => {
                    props.history.push('/')
                }}
            >
            返回首页
            </Button>
        )}
    />
)

export default Error403
