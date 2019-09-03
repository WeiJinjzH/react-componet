import React from 'react'
import { Result, Button } from 'antd'

const Error404 = (props) => (
    <Result
        status="404"
        title="404"
        subTitle="很抱歉，您访问的页面找不到了。"
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

export default Error404
