// this is mostly a redirection import prism from the same source so that we don't have code splitting
// between prism itself and the languages

import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'vue-prism-editor/dist/prismeditor.min.css'

export { PrismEditor } from 'vue-prism-editor'

export default Prism
