import Vue from 'vue'
// import 'highlight.js/styles/a11y-dark.css'
// import 'highlight.js/styles/monokai-sublime.css'
// import 'highlight.js/styles/far.css'
import 'highlight.js/styles/vs2015.css'
const hljs = require('highlight.js/lib/highlight.js')
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))

Vue.prototype.$hljs = hljs

const highlight = (el) => {
  for (const target of el.querySelectorAll('code')) {
    hljs.highlightBlock(target)
  }
}

Vue.directive('hljs', {
  deep: true,
  bind(el) {
    highlight(el)
  },
  componentUpdated(el, binding) {
    highlight(el)
  }
})
