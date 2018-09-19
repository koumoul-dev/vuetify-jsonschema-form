import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DemoApp from './DemoApp.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  components: {DemoApp},
  render: h => h('demo-app')
})
