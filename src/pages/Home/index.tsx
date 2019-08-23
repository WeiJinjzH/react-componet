import React, { Component } from 'react'
import TextButton from 'src/components/TextButton'

class Home extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            href: 'https://volibearcat.top/static/background.jpg',
        }
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <TextButton canPreview href={this.state.href}>image...</TextButton>
                <button onClick={() => { this.setState({ href: 'static/assets/logo.png' }) }}>change href</button>
            </div>
        )
    }
}

export default Home
