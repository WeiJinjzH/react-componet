import React, { useState, useRef } from 'react'
import StepsModal from 'src/components/StepsModal'
import { Button, message } from 'antd'

export default {
    title: 'StepsModal',
    component: StepsModal,
    parameters: {
        componentSubtitle: '集成步骤条的模态窗组件',
    },
}

export const Basic = () => {
    const [visible, setVisible] = useState(false)
    const ref = useRef({})
    return (
        <>
            <Button onClick={() => { setVisible(true) }}>Show Modal</Button>
            <StepsModal
                title="Steps Modal"
                width="max-content"
                getControler={(controler) => { ref.current.controler = controler }}
                visible={visible}
                onCancel={() => { setVisible(false) }}
                onStepEventListener={(stepIndex, newStepIndex, action) => {
                    if (action === 'prev') {
                        ref.current.controler.toPrevStep()
                    } else {
                        switch (stepIndex) {
                        case 2:
                            message.info('跳过步骤四')
                            ref.current.controler.setStepIndex(4)
                            break
                        case 4:
                            ref.current.controler.setLoading(true)
                            setTimeout(() => {
                                message.success('提交完成')
                                setVisible(false)
                            }, 3000)
                            break
                        default:
                            ref.current.controler.toNextStep()
                            break
                        }
                    }
                }}
                completeText="提交"
                steps={[
                    { title: '步骤一', content: () => `步骤一: content属性支持函数渲染, 渲染时时间:${new Date().toLocaleTimeString()}` },
                    {
                        title: '步骤二', content: '步骤二, 修改 上/下一步 按钮文案', prevText: '<==', nextText: '==>',
                    },
                    { title: '步骤三', content: '步骤三: 隐藏"上一步"按钮', showPrevButton: false },
                    { title: '步骤四' },
                    {
                        title: '提交',
                        closable: false,
                        content: (
                            <div style={{ fontSize: 14, textAlign: 'center' }}>点击提交按钮, 模拟数据请求Loading状态</div>
                        ),
                    },
                ]}
            >
                {(content, stepIndex, step) => (
                    <div>
                        <div>{content}</div>
                        <p>当前标题: {step.title}</p>
                        <p>当前索引值: {stepIndex}</p>
                    </div>
                )}
            </StepsModal>
        </>
    )
}
