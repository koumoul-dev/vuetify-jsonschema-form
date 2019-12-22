import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VJsf from '../lib/index.vue'
const examples = require('../doc/examples')
Vue.use(Vuetify)

describe('Examples snapshot', () => {
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
    })
  })
})
