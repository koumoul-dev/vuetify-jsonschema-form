// this is mostly a redirection import prism from the same source so that we don't have code splitting
// between prism itself and the languages

// import 'prismjs/themes/prism.css'
import 'prism-themes/themes/prism-xonokai.css'
import Prism from 'prismjs'
// these register a grammar by mutating the global Prism and export nothing, so they have to
// stay bare side-effect imports (a namespace import breaks vite's cjs interop in dev). The
// .js extension is required to resolve them as ESM when prerendering, and nuxt.config keeps
// the server build from tree-shaking them away.
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-yaml.js'
import 'vue-prism-editor/dist/prismeditor.min.css'

export { PrismEditor } from 'vue-prism-editor'

export default Prism
