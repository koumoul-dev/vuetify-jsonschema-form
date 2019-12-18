import { mount } from '@vue/test-utils'
import VJsf from '../lib/index.vue'

describe('Main component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(VJsf)
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })
})
