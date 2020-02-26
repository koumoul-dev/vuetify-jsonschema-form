import Vue from 'vue'
import '../../lib/deps/third-party.js'
import VJsf from '../../lib/index.vue'
import { defaultTemplate } from '../examples'

export default {
  components: { VJsf },
  props: {
    params: { type: Object, required: true }
  },
  data() {
    return { options: {}, ...this.params }
  },
  render(h) {
    this.compiledTemplate = this.compiledTemplate || Vue.compile(this.template || defaultTemplate)
    return this.compiledTemplate.render.call(this, h)
  }
}
