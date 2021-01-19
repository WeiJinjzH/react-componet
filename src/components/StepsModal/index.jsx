import {
    useEffect, useState, useRef, createRef,
} from 'react'
import {
    Modal, Button, Steps, Spin,
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const StepsModal = (props) => {
    const {
        steps = [],
        children,
        onStepChange, // 步骤变动回调 function(oldStepIndex, newStepIndex)
        onStepEventListener, // 步骤变动事件监听 function(oldStepIndex, newStepIndex, action: string ['prev'|'next'])
        stepsProps, // Steps属性
        defaultStep = 0, // 默认步骤索引
        showPrevButton = true, // 显示"上一步"按钮
        prevText = '上一步',
        nextText = '下一步',
        completeText = '完成',
        getControler,
        afterClose,
        closable,
        ...modalProps
    } = props

    const ref = useRef({ isDestroy: false })
    const [stepIndex, setStepIndex] = useState(defaultStep)
    const [spinning, setSpinning] = useState(false)
    const [stepLoading, setStepLoading] = useState(false)
    const [buttonsLoading, setButtonsLoading] = useState(false)

    useEffect(() => {
        getControler && getControler({
            setLoading: (_modalLoading, _stepLoading = _modalLoading, _buttonsLoading = _modalLoading) => {
                if (ref.current.isDestroy) { return }
                setSpinning(_modalLoading)
                setStepLoading(_stepLoading)
                setButtonsLoading(_buttonsLoading)
            },
            toNextStep: () => {
                onStepChange && onStepChange(stepIndex, Math.min(stepIndex + 1, steps.length - 1))
                setStepIndex(Math.min(stepIndex + 1, steps.length - 1))
            },
            toPrevStep: () => {
                onStepChange && onStepChange(stepIndex, Math.max(stepIndex - 1, 0))
                setStepIndex(Math.max(stepIndex - 1, 0))
            },
            setStepIndex: (newStepIndex) => {
                onStepChange && onStepChange(stepIndex, newStepIndex)
                setStepIndex(newStepIndex)
            },
            getStepIndex: () => stepIndex,
            resetStepIndex: () => {
                onStepChange && onStepChange(stepIndex, defaultStep)
                setStepIndex(defaultStep)
            },
        })
    }, [defaultStep, getControler, onStepChange, stepIndex, steps.length])

    useEffect(() => () => {
        ref.current.isDestroy = true
    }, [])

    const {
        showPrevButton: itemShowPrevButon,
        prevText: itemPrevText,
        nextText: itemNextText,
        closable: itemClosable,
        title,
        key,
    } = steps[stepIndex]
    let { content } = steps[stepIndex]
    if (typeof content === 'function') {
        content = steps[stepIndex].content(stepIndex)
    }
    return (
        <Modal
            destroyOnClose
            maskClosable={itemClosable ?? closable}
            closable={itemClosable ?? closable}
            afterClose={() => {
                setStepIndex(defaultStep)
                setSpinning(false)
                setStepLoading(false)
                setButtonsLoading(false)
                afterClose && afterClose()
            }}
            footer={(
                <div>
                    {
                        (itemShowPrevButon ?? (stepIndex !== 0 && stepIndex !== steps.length - 1 && showPrevButton)) && (
                            <Button
                                key="prev"
                                disabled={buttonsLoading}
                                onClick={() => {
                                    onStepEventListener && onStepEventListener(stepIndex, Math.max(stepIndex - 1, 0), 'prev')
                                }}
                            >{itemPrevText || prevText}
                            </Button>
                        )
                    }
                    <Button
                        key="next"
                        type="primary"
                        loading={buttonsLoading}
                        onClick={() => {
                            onStepEventListener && onStepEventListener(stepIndex, Math.min(stepIndex + 1, steps.length - 1), 'next')
                        }}
                    >{itemNextText || (stepIndex < steps.length - 1 ? nextText : completeText)}
                    </Button>
                </div>
            )}
            {...modalProps}
        >
            <div>
                <Steps
                    style={{ paddingBottom: 24 }}
                    current={stepIndex}
                    size="small"
                    progressDot
                    status={spinning ? 'process' : undefined}
                    {...stepsProps}
                >
                    {
                        steps.map((step, index) => {
                            const {
                                content: _unusedContent,
                                prevText: _unusedPrevText,
                                nextText: _unusedNextText,
                                showPrevButton: _unusedShowPrevButton,
                                closable: _neverUsedClosable,
                                ...stepProps
                            } = step
                            return (
                                <Steps.Step
                                    key={step.title}
                                    {...stepProps}
                                    progressDot={!(index === stepIndex && stepLoading)}
                                    icon={index === stepIndex && stepLoading ? (
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 12,
                                                position: 'relative',
                                                top: -14,
                                                left: -1,
                                            }}
                                        />
                                    ) : undefined}
                                />
                            )
                        })
                    }
                </Steps>
                <Spin spinning={spinning}>
                    <div key={key || title}>
                        {typeof children !== 'function' && content}
                        {typeof children === 'function' ? children(content, stepIndex, steps[stepIndex]) : children}
                    </div>
                </Spin>
            </div>
        </Modal>
    )
}

export default StepsModal
