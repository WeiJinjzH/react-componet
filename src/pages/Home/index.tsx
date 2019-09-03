import React, { Component } from 'react'
import { PageHeader, Button, Tabs, Descriptions, Statistic } from 'antd'
import TextButton from 'src/components/TextButton'
import { http } from 'src/utils'
import PreviewImageModal from 'src/components/PreviewImageModal'

const { TabPane } = Tabs
const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="Association">
            <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="Remarks">
        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
    </Descriptions>
)

const extraContent = (
    <div
        style={{
            display: 'flex',
            width: 'max-content',
            justifyContent: 'flex-end',
        }}
    >
        <Statistic
            title="Status"
            value="Pending"
            style={{
                marginRight: 32,
            }}
        />
        <Statistic title="Price" prefix="$" value={568.08} />
    </div>
)

const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">
            {children}
        </div>
        <div className="extra">
            {extra}
        </div>
    </div>
)

class Home extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            href: 'https://volibearcat.top/static/background.jpg', // http://images.mofcom.gov.cn/sczxs/201806/20180622090409090.pdf
        }
    }

    render() {
        return (
        //     <div>
        //         <PageHeader
        //             onBack={() => window.history.back()}
        //             title="Title"
        //             subTitle="This is a subtitle"
        //             extra={[
        //                 <Button key="3">Operation</Button>,
        //                 <Button key="2">Operation</Button>,
        //                 <Button key="1" type="primary">
        //   Primary
        //                 </Button>,
        //             ]}
        //             footer={(
        //                 <Tabs defaultActiveKey="1">
        //                     <TabPane tab="Details" key="1" />
        //                     <TabPane tab="Rule" key="2" />
        //                 </Tabs>
        //             )}
        //         >
        //             <Content extra={extraContent}>
        //                 {renderContent()}
        //             </Content>
        //         </PageHeader>
        //     </div>
            <div style={{ padding: 20 }}>
                <TextButton onClick={() => { http.get('/table') }} style={{ color: 'black' }}>测试文本</TextButton>
                <TextButton canPreview href={this.state.href}>image...</TextButton>
                <button onClick={() => { this.setState({ href: 'static/assets/logo.png' }) }}>change href</button>
                <button onClick={() => { this.setState({ visible: true }) }}>change modal</button>
                <PreviewImageModal visible={this.state.visible} href="https://volibearcat.top/static/background.jpg" onCancel={() => { this.setState({ visible: false }) }} />
            </div>
        )
    }
}

export default Home
