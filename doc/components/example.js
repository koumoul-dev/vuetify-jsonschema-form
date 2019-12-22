import Vue from 'vue'
import VJsf from '../../lib/index.vue'

export default {
  components: { VJsf },
  props: {
    template: { type: String, default: '<v-jsf :model="model" :schema="schema" :options="options" />' },
    model: { type: Object, required: true },
    schema: { type: Object, required: true },
    options: { type: Object, required: true }
  },
  render(h) {
    this.compiledTemplate = this.compiledTemplate || Vue.compile(this.template)
    return this.compiledTemplate.render.call(this, h)
  }
}
