// import this module if you want to be sure that you get all dependancies
// used by vjsf functionalities (color picker, etc.)

import Vue from 'vue'
import Draggable from 'vuedraggable'
const _global = (typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}
_global.markdownit = require('markdown-it')
Vue.component('draggable', Draggable)
_global.Ajv = require('ajv')
_global.ajvLocalize = require('ajv-i18n')
_global.ajvAddFormats = require('ajv-formats')
