import Vue from 'vue'
import VJsf from '../../lib/index.vue'
import { defaultTemplate } from '../examples'

export default {
  components: { VJsf },
  props: {
    template: { type: String, required: false },
    model: { type: Object, required: true },
    schema: { type: Object, required: true },
    options: { type: Object, required: true }
  },
  render(h) {
    this.compiledTemplate = this.compiledTemplate || Vue.compile(this.template || defaultTemplate)
    return this.compiledTemplate.render.call(this, h)
  }
}
