import React from 'react'
import { shallow, mount, configure } from 'enzyme'

describe('test suite: Test component', () => {
    it('case: expect Test render a div with className: text-button', () => {
        const wrapper = shallow(<div>123</div>)
        expect(wrapper.find('div').text()).toBe('123')
    })
})
