// import this module if you want to be sure that you get all dependancies
// used by vjsf functionalities (color picker, etc.)

import Vue from 'vue'
import Draggable from 'vuedraggable'
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'
import { Sketch } from 'vue-color'

Vue.component('swatches', Swatches)
Vue.component('draggable', Draggable)
Vue.component('color-picker', Sketch)
