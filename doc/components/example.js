import Vue from 'vue'
import Draggable from 'vuedraggable'
import '../../lib/deps/third-party.js'
import VJsf from '../../lib/VJsfNoDeps.js'
import '../../lib/VJsf.css'
import EasyMDE from 'easymde/dist/easymde.min.js'
import 'easymde/dist/easymde.min.css'
import VJsfTiptap from './wrappers/v-jsf-tiptap.vue'
import VJsfToastUiEditor from './wrappers/v-jsf-toast-ui-editor.vue'
import VJsfCropImg from './wrappers/v-jsf-crop-img.vue'
import VJsfTable from './wrappers/v-jsf-table.vue'
import { defaultTemplate } from '../examples'

Vue.component('Draggable', Draggable)

global.EasyMDE = EasyMDE

export default {
  components: { VJsf, VJsfTiptap, VJsfToastUiEditor, VJsfCropImg, VJsfTable },
  props: {
    params: { type: Object, required: true }
  },
  data () {
    const params = { ...this.params }
    params.options = params.options || {}
    params.options.idPrefix = params.options.idPrefix || `example-${params.id}-`
    params.schema = JSON.parse(JSON.stringify(params.schema))
    return params
  },
  watch: {
    model () {
      this.params.model = this.model
    }
  },
  render (h) {
    this.compiledTemplate = this.compiledTemplate || Vue.compile(this.template || defaultTemplate)
    return this.compiledTemplate.render.call(this, h)
  },
  methods: {
    logEvent (key, $event) {
      console.log(`vjsf event "${key}"`, $event)
    }
  }
}
