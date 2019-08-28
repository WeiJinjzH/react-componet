import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import TextButton from 'src/components/TextButton'
import { act } from 'react-dom/test-utils';

describe('Component: TextButton', () => {
    it('浅渲染 TextButton', () => {
        const wrapper = shallow(<TextButton />)
        expect(wrapper.find('.text-button').length).toEqual(1)
    })
    it('case: expect Test render a div with className: text-button', () => {
        const wrapper = mount(<TextButton canPreview disabled href="https://volibearcat.top/static/background.jpg">image...</TextButton>)
        wrapper.simulate('click')
        expect(wrapper.find('.text-button').length).toEqual(1)
    })
})
