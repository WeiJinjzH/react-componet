import { mount } from 'enzyme'
import React from 'react'
import PreviewImageModal from 'src/components/PreviewImageModal'

describe('utils function: PreviewImageModal', () => {
    it('PreviewImageModal render test', () => {
        const onCancel = jest.fn()
        const wrapper = mount(<PreviewImageModal href=".png" onCancel={onCancel} />)
        expect(wrapper.find('.ant-modal-wrap')).toHaveLength(1)
        expect(wrapper).toMatchSnapshot()
        wrapper.props().onCancel()
        expect(onCancel).toBeCalledTimes(1)
    })
})

describe('Component: PreviewImageModal', () => {
    it('render test', () => {
        const wrapper1 = mount(<PreviewImageModal visible href=".png" />)
        expect(wrapper1).toMatchSnapshot()

        const wrapper2 = mount(<PreviewImageModal visible href=".jpg" />)
        expect(wrapper2).toMatchSnapshot()
    })
    it('interaction test: img onError event', () => {
        const onCancel = jest.fn()
        const onDestroy = jest.fn()
        const wrapper = mount(<PreviewImageModal visible href=".x" onCancel={onCancel} onDestroy={onDestroy} />)
        expect(wrapper).toMatchSnapshot()
        wrapper.find('img').getDOMNode().dispatchEvent(new Event('error'))
        wrapper.children().at(0).props().afterClose()
        expect(onDestroy).toBeCalledTimes(1)

        /* 缺少 'onCancel' 属性时, 将直接触发 'onDestroy'事件 */
        const onDestroy2 = jest.fn()
        const wrapper2 = mount(<PreviewImageModal visible href=".x" onDestroy={onDestroy2} />)
        expect(wrapper2).toMatchSnapshot()
        wrapper2.find('img').getDOMNode().dispatchEvent(new Event('error'))
        wrapper2.children().at(0).props().afterClose()
        expect(onDestroy2).toBeCalledTimes(1)
    })
    it('interaction test: img onLoad event', () => {
        const wrapper = mount(<PreviewImageModal visible href=".x" />)
        expect(wrapper).toMatchSnapshot()
        wrapper.find('img').getDOMNode().dispatchEvent(new Event('load'))
        expect(wrapper.state('loading')).toBe(false)
    })
    it('interaction test: Modal onCancel event', () => {
        const onCancel = jest.fn()
        const wrapper = mount(<PreviewImageModal visible href=".jpg" onCancel={onCancel} />)
        expect(wrapper).toMatchSnapshot()
        wrapper.children().at(0).props().onCancel()
        expect(onCancel).toBeCalledTimes(1)
    })
    it('interaction test: change background-color event', () => {
        const wrapper = mount(<PreviewImageModal visible href=".png" />)
        wrapper.find('div[title="#FFFFFF"]').simulate('click')
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.state('backgroundColor')).toBe('white')
    })
})
