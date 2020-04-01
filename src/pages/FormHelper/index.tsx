import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import {
    Button, Form, Input, Modal,
} from 'antd'
import React, { Component } from 'react'
import FormBlock from 'src/components/FormBlock'
import style from './index.less'

function copyToClipboard(text) {
    const textArea = document.createElement('textarea')
    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = '0'
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        return successful
    } catch (err) {
        return false
    }
}

/** 配置转换 */
function transferConfig(processedField, _rawField) {
    const { required, ...rawField } = _rawField
    Object.assign(processedField, rawField)
    if (rawField.type === 'render') {
        processedField.type = undefined
    } else if (rawField.type) {
        processedField.render = undefined
    }
    if (required && rawField.name && !processedField.rules?.some((rule) => 'required' in rule)) {
        const rules = processedField.rules || []
        rules.unshift({ required: true, message: '必填' })
        processedField.rules = rules
    }
}

class FormHelper extends Component<any, any> {
    fieldConfigForm: any

    constructor(props) {
        super(props)
        this.state = {
            rawConfigs: [],
            processedConfig: [],
            formConfig: {},
        }
        this.update = utils.debounce(this.update.bind(this), 500)
        this.addField = this.addField.bind(this)
        this.formConfigChange = this.formConfigChange.bind(this)
        this.fieldConfigChange = this.fieldConfigChange.bind(this)
    }

    componentDidMount() {
        const { processedConfig } = this.state
        const rawConfigsString = (localStorage.getItem('rawConfigs') || '[]')
            .replace(/"\[function::start\]|\[function::end\]"/g, '')
            .replace(/.+\[\[REMOVE_MARKER\]\].+\n/g, '')
            .replace(/"(.+)":/g, '$1:')
            .replace(/: "(.+)",?/g, ': \'$1\',')
            .replace(/(}|\])\n/g, '$1,\n')
        // eslint-disable-next-line no-eval
        const rawConfigs = eval(`${rawConfigsString}`)
        rawConfigs.forEach((rawConfig) => {
            const processedField = {}
            rawConfig.processedField = processedField
            transferConfig(processedField, rawConfig.rawField)
            processedConfig.push(processedField)
        })
        this.setState({ rawConfigs, processedConfig })
    }

    addField() {
        const { rawConfigs, processedConfig } = this.state
        const rawField = {
            type: undefined,
            render: undefined,
            label: undefined,
            name: undefined,
            key: new Date().getTime(),
        }
        const rawConfig = {
            key: rawField.key,
            rawField,
            processedField: {
                key: rawField.key,
            },
        }
        rawConfigs.push(rawConfig)
        processedConfig.push(rawConfig.processedField)
        this.forceUpdate()
    }

    /** 设置表单属性配置 */
    formConfigChange(_, values) {
        this.setState({ formConfig: values })
    }

    fieldConfigChange({ rawField, processedField }, newRawField) {
        Object.assign(rawField, newRawField)
        transferConfig(processedField, rawField)
        this.update()
    }

    showCustomRenderModal(rawConfig) {
        const { rawField, processedField } = rawConfig
        let inputValue = rawField.render?.toString() || '(value, values, form) => value'
        Modal.confirm({
            title: '请输入自定义渲染函数',
            content: (
                <Input.TextArea
                    defaultValue={inputValue}
                    onChange={(e) => {
                        inputValue = e.target.value
                    }}
                />
            ),
            onOk: () => {
                /* eslint-disable no-eval */
                try {
                    rawField.render = eval(inputValue)
                    transferConfig(processedField, rawField)
                } catch (error) {
                    Modal.error({ title: error.toString() })
                    throw error
                }
                this.update()
                /* eslint-enable no-eval */
            },
        })
    }

    /** 更新预览 */
    update() {
        this.forceUpdate()
        localStorage.setItem('rawConfigs', JSON.stringify(this.state.rawConfigs, (key, value) => {
            if (typeof value === 'function') {
                return `[function::start]${value}[function::end]`
            }
            if (key === 'rules' && Array.isArray(value) && value.length === 0) {
                return '[[REMOVE_MARKER]]'
            }
            return value
        }, '    '))
    }

    render() {
        return (
            <div>
                <FormBlock
                    onValuesChange={this.formConfigChange}
                    layout="inline"
                    fields={[
                        {
                            label: 'columnCount',
                            name: 'columnCount',
                            type: 'Select',
                            props: {
                                style: { minWidth: 80 },
                                options: [1, 2, 3, 4, 6, 12, 24].map((value) => ({
                                    label: value,
                                    value,
                                })),
                            },
                        },
                        {
                            label: 'compact', name: 'compact', type: 'Switch',
                        },
                        { label: 'labelCol', name: 'labelCol', type: 'InputNumber' },
                        { label: 'wrapperCol', name: 'wrapperCol', type: 'InputNumber' },
                    ]}
                />
                <div className={style.formHelper}>
                    <div className={style.operationBox}>
                        {
                            this.state.rawConfigs.map((rawConfig) => {
                                const { key, rawField } = rawConfig
                                return (
                                    <FormBlock
                                        key={key}
                                        getForm={(form) => {
                                            rawConfig.formInstance = form
                                            Object.defineProperty(rawConfig, 'formInstance', {
                                                enumerable: false,
                                            })
                                        }}
                                        initialValues={rawField}
                                        style={{ position: 'relative' }}
                                        columnCount={4}
                                        labelCol={6}
                                        wrapperCol={16}
                                        compact
                                        onValuesChange={(changedValues, values) => {
                                            this.fieldConfigChange(rawConfig, values)
                                        }}
                                        fields={[
                                            { label: 'label', name: 'label', type: 'Input' },
                                            {
                                                label: 'type',
                                                name: 'type',
                                                type: 'Select',
                                                props: {
                                                    options: [
                                                        { label: 'Text', value: 'Text' },
                                                        { label: 'Input', value: 'Input' },
                                                        { label: 'Select', value: 'Select' },
                                                        { label: 'DatePicker', value: 'DatePicker' },
                                                        { label: 'Switch', value: 'Switch' },
                                                        { label: 'Custom Render', value: 'render' },
                                                    ],
                                                    onSelect: (value) => {
                                                        if (value === 'render') {
                                                            this.showCustomRenderModal(rawConfig)
                                                        }
                                                        if (value === 'Switch') {
                                                            rawField.valuePropName = 'checked'
                                                            this.fieldConfigChange(rawConfig, rawField)
                                                        }
                                                    },
                                                },
                                            },
                                            { label: 'name', name: 'name', type: 'Input' },
                                            {
                                                label: 'required',
                                                name: 'required',
                                                type: 'Switch',
                                                span: 4,
                                                labelCol: 12,
                                                wrapperCol: 12,
                                                hidden: (({ name }) => !name),
                                            },
                                            {
                                                key: 'more_setting',
                                                span: 2,
                                                render: () => (
                                                    <div style={{
                                                        position: 'absolute', left: 0, top: 0, lineHeight: '32px',
                                                    }}
                                                    >
                                                        <SettingOutlined
                                                            style={{ marginRight: 8 }}
                                                            onClick={() => {
                                                                this.setState({
                                                                    showFieldConfigModal: true,
                                                                    currentRawConfig: rawConfig,
                                                                }, () => {
                                                                    const { formInstance, ...rest } = rawField
                                                                    const fieldConfig = Object.entries(rest)
                                                                        .reduce((result, [label, value]) => ([...result, { label, value: typeof value === 'function' ? value.toString() : JSON.stringify(value) }]), [])
                                                                        .filter(({ value }) => value !== undefined)
                                                                    setTimeout(() => {
                                                                        this.fieldConfigForm.setFieldsValue({ fields: fieldConfig })
                                                                    }, 0)
                                                                })
                                                            }}
                                                        />
                                                        <DeleteOutlined />
                                                    </div>
                                                ),
                                            },
                                        ]}
                                    />
                                )
                            })
                        }
                        <Button onClick={this.addField}>添加字段</Button>
                        <Button
                            style={{ marginLeft: 16 }}
                            onClick={() => {
                                const str = JSON.stringify(this.state.processedConfig, (key, value) => {
                                    if (typeof value === 'function') {
                                        return `[function::start]${value}[function::end]`
                                    }
                                    if (key === 'rules' && Array.isArray(value) && value.length === 0) {
                                        return '[[REMOVE_MARKER]]'
                                    }
                                    return value
                                }, '    ')
                                const result = str
                                    .replace(/"\[function::start\]|\[function::end\]"/g, '')
                                    .replace(/.+\[\[REMOVE_MARKER\]\].+\n/g, '')
                                    .replace(/"(.+)":/g, '$1:')
                                    .replace(/: "(.+)",?/g, ': \'$1\',')
                                    .replace(/(}|\])\n/g, '$1,\n')
                                copyToClipboard(result)
                            }}
                            type="primary"
                        >
                            拷贝字段配置
                        </Button>
                    </div>
                    <div id="previewBox" className={style.previewBox}>
                        <FormBlock
                            columnCount={2}
                            labelCol={8}
                            wrapperCol={14}
                            {...this.state.formConfig}
                            fields={this.state.processedConfig}
                        />
                    </div>
                </div>
                <Modal
                    title="属性配置"
                    visible={this.state.showFieldConfigModal}
                    onCancel={() => {
                        this.setState({ showFieldConfigModal: false })
                    }}
                    onOk={() => {
                        this.fieldConfigForm.submit()
                    }}
                >
                    <FormBlock
                        onFinish={(values) => {
                            // eslint-disable-next-line no-eval
                            const newFieldsConfig = values.fields.reduce((result, { label, value }) => Object.assign(result, { [label]: eval(value) }), this.state.currentRawConfig.field)
                            this.state.currentRawConfig.formInstance.setFieldsValue({ ...newFieldsConfig, type: newFieldsConfig.render ? 'render' : newFieldsConfig.type })
                            this.update()
                        }}
                        getForm={(form) => { this.fieldConfigForm = form }}
                        fields={[
                            {
                                name: 'fields',
                                renderList: (fields, { add, value, form }) => (
                                    <div>
                                        {
                                            fields.map(({ key, ...field }) => (
                                                <div
                                                    key={key}
                                                >
                                                    <Input.Group compact>
                                                        <Form.Item name={[field.name, 'label']} required>
                                                            <Input style={{ width: 200, marginRight: 8 }} />
                                                        </Form.Item>
                                                        <Form.Item name={[field.name, 'value']} required>
                                                            <Input style={{ width: 200, marginRight: 8 }} />
                                                        </Form.Item>
                                                    </Input.Group>
                                                </div>
                                            ))
                                        }
                                        <Button onClick={add} type="primary">Add</Button>
                                    </div>
                                ),
                            },
                        ]}
                    />
                </Modal>
            </div>
        )
    }
}

export default FormHelper
