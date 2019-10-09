import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import RawEditor from './RawEditor.vue'
import Draggable from 'vuedraggable'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'
import { Sketch } from 'vue-color'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.component('swatches', Swatches)
Vue.component('draggable', Draggable)
Vue.component('color-picker', Sketch)

new Vue({
  el: '#app',
  components: { RawEditor },
  render: h => h('raw-editor'),
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi'
    }
  })
})
