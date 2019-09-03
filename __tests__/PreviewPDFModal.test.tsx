import { render, shallow, mount } from 'enzyme'
import React from 'react'
import utils from 'src/utils'
import PreviewPDFModal from 'src/components/PreviewPDFModal'

describe('utils function: PreviewPDFModal', () => {
    it('PreviewPDFModal render test', () => {
        const onCancel = jest.fn()
        const wrapper = mount(<PreviewPDFModal href=".pdf" onCancel={onCancel} />)
        expect(wrapper.find('.ant-modal-wrap')).toHaveLength(1)
        expect(wrapper).toMatchSnapshot()
        wrapper.props().onCancel()
        expect(onCancel).toBeCalledTimes(1)
    })
})

describe('Component: PreviewPDFModal', () => {
    it('render test', () => {
        const wrapper1 = mount(<PreviewPDFModal visible href=".pdf" />)
        expect(wrapper1).toMatchSnapshot()

        const wrapper2 = mount(<PreviewPDFModal href=".pdf" />)
        expect(wrapper2).toMatchSnapshot()
    })
    it('interaction test: Modal onCancel event', () => {
        const onCancel = jest.fn()
        const onDestroy = jest.fn()
        const wrapper = mount(<PreviewPDFModal visible href=".jpg" onCancel={onCancel} onDestroy={onDestroy} />)
        expect(wrapper).toMatchSnapshot()
        wrapper.children().at(0).props().onCancel()
        expect(onCancel).toBeCalledTimes(1)
        wrapper.children().at(0).props().afterClose()
        expect(onDestroy).toBeCalledTimes(1)
    })
})
