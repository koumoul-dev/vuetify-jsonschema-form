// import this module if you want to be sure that you get all dependancies
// used by vjsf functionalities (color picker, etc.)

import Vue from 'vue'
import Draggable from 'vuedraggable'
import markdownIt from 'markdown-it'
import ajv from 'ajv'
import ajvI18n from 'ajv-i18n'
import ajvFormats from 'ajv-formats'

const _global = (typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}
_global.markdownit = markdownIt
Vue.component('Draggable', Draggable)
_global.Ajv = ajv
_global.ajvLocalize = ajvI18n
_global.ajvAddFormats = ajvFormats
