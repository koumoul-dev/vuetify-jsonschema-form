import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VJsf from '../lib/index.vue'
import examples from '../doc/examples'
Vue.use(Vuetify)

describe('Examples used as simple test cases', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify({
      mocks: {
        $vuetify: {
          theme: { themes: {} }
        }
      }
    })
  })

  examples.forEach(example => {
    test(example.title, () => {
      const wrapper = mount(VJsf, { vuetify, propsData: example })
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.element).toMatchSnapshot()
      if (example.test) example.test(wrapper)
    })
  })
})
