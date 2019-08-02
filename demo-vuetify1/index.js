import DemoApp from './DemoApp.vue'
import Draggable from 'vuedraggable'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'
import { Sketch } from 'vue-color'

const Vue = window.Vue
Vue.use(window.Vuetify)
Vue.use(VueAxios, axios)

Vue.component('swatches', Swatches)
Vue.component('draggable', Draggable)
Vue.component('color-picker', Sketch)

new Vue({
  el: '#app',
  components: { DemoApp },
  render: h => h('demo-app')
})
