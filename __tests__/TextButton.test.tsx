import { render, shallow, mount } from 'enzyme'
import React from 'react'
import TextButton from 'src/components/TextButton'

describe('Component: TextButton', () => {
    it('render test', () => {
        const wrapper = shallow(<TextButton />)
        expect(wrapper.find('.text-button')).toHaveLength(1)
        expect(wrapper.html()).toContain('<button')
        expect(wrapper).toMatchSnapshot()

        const wrapper2 = shallow(<TextButton>Text</TextButton>)
        expect(wrapper2.hasClass('text-button')).toBeTruthy()
        expect(wrapper2).toMatchSnapshot()

        const wrapper3 = shallow(<TextButton disabled>Text</TextButton>)
        expect(wrapper3).toMatchSnapshot()

        const wrapper4 = shallow(<TextButton canPreview={false} />)
        expect(wrapper4.find('.text-button')).toHaveLength(1)
        expect(wrapper4).toMatchSnapshot()

        const wrapper5 = shallow((<TextButton href="/" disabled />))
        expect(wrapper5.html()).toContain('<a')
        expect(wrapper5.hasClass('text-button-link')).toBeTruthy()
        expect(wrapper5.hasClass('text-button-link--disabled')).toBeTruthy()
    })


    it('interaction test', () => {
        const onClick = jest.fn()
        const wrapper = mount((<TextButton href="/" onClick={onClick} disabled />))
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(0)

        /** href 与 onClick 同时存在时, onClick将不生效 */
        wrapper.setProps({ disabled: false })
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(0)

        wrapper.setProps({ href: undefined })
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(1)

        wrapper.setProps({ href: '.png' })
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(1)

        wrapper.setProps({ href: '.pdf' })
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(1)

        wrapper.setProps({ canPreview: false })
        wrapper.find('.text-button').simulate('click')
        expect(onClick).toBeCalledTimes(1)
    })
})
