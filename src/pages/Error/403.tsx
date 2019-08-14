import React from 'react'

const img = require('src/assets/images/error403.png')

const Error403 = () => (
    <div style={{ textAlign: 'center', width: '100%', position: 'relative' }}>
        <img alt="" src={img} />
        <h3 style={{ fontSize: '40px' }}>403</h3>
        <h3>很抱歉，您无权限访问此页面</h3>
    </div>
)

export default Error403
