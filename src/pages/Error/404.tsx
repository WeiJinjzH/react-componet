import React from 'react'

const img = require('src/assets/images/error.png')

const Error404 = () => (
    <div style={{ textAlign: 'center', width: '100%', position: 'relative' }}>
        <img alt="" src={img} />
        <h3 style={{ fontSize: '40px' }}>404</h3>
        <h3>很抱歉，您访问的页面找不到了</h3>
    </div>
)

export default Error404
