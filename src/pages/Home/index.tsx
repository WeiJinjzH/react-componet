import React, { Component } from 'react'
import PreviewImageModal from 'src/components/PreviewImageModal'
import TextButton from 'src/components/TextButton'
import { http } from 'src/utils'
import style from './index.less'


class Home extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            href: 'https://volibearcat.top/static/background.jpg', // http://images.mofcom.gov.cn/sczxs/201806/20180622090409090.pdf
        }
    }

    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#fff', padding: 24 }}>
                    <TextButton className={style.abDdd} onClick={() => { http.get('/form?size=10') }} style={{ color: 'black' }}>测试文本</TextButton>
                    <TextButton canPreview href={this.state.href}>image...</TextButton>
                    <button onClick={() => { this.setState({ href: 'http://localhost:7099/static/assets/logo.png' }) }}>change href</button>
                    <button onClick={() => { this.setState({ visible: true }) }}>change modal</button>
                    <PreviewImageModal visible={this.state.visible} href="https://volibearcat.top/static/background.jpg" onCancel={() => { this.setState({ visible: false }) }} />
                </div>
            </div>
        )
    }
}

export default Home
