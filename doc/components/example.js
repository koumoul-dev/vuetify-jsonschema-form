import Vue from 'vue'
import '../../lib/deps/third-party.js'
import VJsf from '../../lib/VJsf.js'
import '../../lib/VJsf.css'
import { defaultTemplate } from '../examples'

export default {
  components: { VJsf },
  props: {
    params: { type: Object, required: true }
  },
  data() {
    const params = { ...this.params }
    params.options = params.options || {}
    params.options.idPrefix = params.options.idPrefix || `example-${params.id}-`
    return params
  },
  render(h) {
    this.compiledTemplate = this.compiledTemplate || Vue.compile(this.template || defaultTemplate)
    return this.compiledTemplate.render.call(this, h)
  }
}
