import { Button, Select } from 'antd'
import React, { Component } from 'react'
import SearchBar from 'src/components/SearchBar'
import TextButton from 'src/components/TextButton'
import { http } from 'src/utils'
import PreviewImageModal from 'src/components/PreviewImageModal'
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
                <div style={{ backgroundColor: '#fff', padding: 24, marginBottom: 24 }}>
                    <TextButton className={style.abDdd} onClick={() => { http.get('/form?size=10') }} style={{ color: 'black' }}>测试文本</TextButton>
                    <TextButton canPreview href={this.state.href}>image...</TextButton>
                    <button onClick={() => { this.setState({ href: 'http://localhost:7099/static/assets/logo.png' }) }}>change href</button>
                    <button onClick={() => { this.setState({ visible: true }) }}>change modal</button>
                    <PreviewImageModal visible={this.state.visible} href="https://volibearcat.top/static/background.jpg" onCancel={() => { this.setState({ visible: false }) }} />
                </div>
                <SearchBar
                    onFinish={(values) => { console.log(values) }}
                    fields={[
                        {
                            label: '字段1',
                            name: 'fields1',
                            hidden: this.state.hidden,
                            node: ({ value, setValue, setValues }) => (
                                <Button onClick={() => { this.setState({ hidden: true }) }}>
                                    { value || 'button'}
                                </Button>
                            ),
                        },
                        {
                            label: '字段2',
                            name: 'fields2',
                            shouldUpdate: true,
                            node: (
                                <Select onChange={() => { this.setState({ hidden: false }) }}>
                                    <Select.Option value="1">Option1</Select.Option>
                                    <Select.Option value="2">Option2</Select.Option>
                                </Select>
                            ),
                        },
                        {
                            label: '字段3',
                            name: 'fields3',
                            node: ({ value, setValues }) => (
                                <Button onClick={() => { setValues({ fields1: 666 }) }}>
                                    { value || 'button'}
                                </Button>
                            ),
                        },
                    ]}
                />
            </div>
        )
    }
}

export default Home
