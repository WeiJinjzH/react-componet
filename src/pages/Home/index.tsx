import React, { Component } from 'react'
import TextButton from 'src/components/TextButton'
import { http } from 'src/utils'

class Home extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            href: 'https://volibearcat.top/static/background.jpg', // http://images.mofcom.gov.cn/sczxs/201806/20180622090409090.pdf
        }
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <TextButton onClick={() => { http.get('/table') }} style={{ color: 'black' }}>测试文本</TextButton>
                <TextButton canPreview href={this.state.href}>image...</TextButton>
                <button onClick={() => { this.setState({ href: 'static/assets/logo.png' }) }}>change href</button>
            </div>
        )
    }
}

export default Home
