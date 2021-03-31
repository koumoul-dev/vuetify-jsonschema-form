import Vue from 'vue'
import '../../lib/deps/third-party.js'
import VJsf from '../../lib/VJsf.js'
import '../../lib/VJsf.css'
import VJsfTiptap from './wrappers/v-jsf-tiptap.vue'
import VJsfToastUiEditor from './wrappers/v-jsf-toast-ui-editor.vue'
import VJsfCropImg from './wrappers/v-jsf-crop-img.vue'
import { defaultTemplate } from '../examples'

export default {
  components: { VJsf, VJsfTiptap, VJsfToastUiEditor, VJsfCropImg },
  props: {
    params: { type: Object, required: true }
  },
  data() {
    const params = { ...this.params }
    params.options = params.options || {}
    params.options.idPrefix = params.options.idPrefix || `example-${params.id}-`
    return params
  },
  watch: {
    model() {
      this.params.model = this.model
    }
  },
  render(h) {
    this.compiledTemplate = this.compiledTemplate || Vue.compile(this.template || defaultTemplate)
    return this.compiledTemplate.render.call(this, h)
  },
  methods: {
    logEvent(key, $event) {
      console.log(`vjsf event "${key}"`, $event)
    }
  }
}
