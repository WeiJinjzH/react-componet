import { render, shallow, mount } from 'enzyme'
import React from 'react'
import TextButton from 'src/components/TextButton'

describe('Component: TextButton', () => {
    it('正确的渲染', () => {
        const wrapper = shallow(<TextButton />)
        expect(wrapper.find('.text-button')).toHaveLength(1)

        const wrapper2 = shallow(<TextButton>Text</TextButton>)
        expect(wrapper2.find('.text-button')).toHaveLength(1)
    })
    it('check: canPreview', () => {
        const wrapper = shallow(<TextButton canPreview={false} />)
        const wrapper2 = shallow(<TextButton canPreview={false}>Test</TextButton>)
        expect(wrapper.find('.text-button')).toHaveLength(1)
        expect(wrapper2.find('.text-button')).toHaveLength(1)
    })
    it('check: href', () => {
        const wrapper = render((
            <div>
                <TextButton href="/" />
            </div>
        ))
        expect(wrapper.html()).toContain('<a')
        const wrapper2 = render((
            <div>
                <TextButton />
            </div>
        ))
        expect(wrapper2.html()).toContain('<button')
    })
    it('check: disabled', () => {
        const onClick = jest.fn()
        const wrapper = mount((
            <TextButton href="/" onClick={onClick} />
        ))
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(0)
    })
})
