import React, { Component } from 'react'
import FormBlock from 'src/components/FormBlock'
import renderForm from 'src/utils/render-form'
import classNames from 'classnames'
import TextButton from 'src/components/TextButton'
import styles from './index.less'

class Home extends Component {
    render() {
        return (
            <div>
                <FormBlock>
                    {
                        form => renderForm(form, [
                            {
                                label: '测试标题1',
                                key: 'key1',
                                type: 'Text',
                            },
                            {
                                label: '测试标题2',
                                key: 'key2',
                                type: 'Input',
                            },
                            {
                                label: '测试标题3',
                                key: 'key3',
                                type: 'Text',
                            },
                        ])
                    }
                </FormBlock>
                <TextButton
                    href="/image.pdf"
                >
                    TextButton Test
                </TextButton>
            </div>
        )
    }
}

export default Home
