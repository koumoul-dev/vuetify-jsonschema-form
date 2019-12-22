import Vue from 'vue'
import 'highlight.js/styles/a11y-dark.css'
const hljs = require('highlight.js/lib/highlight.js')
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'))
hljs.initHighlightingOnLoad()
Vue.prototype.$hljs = hljs
