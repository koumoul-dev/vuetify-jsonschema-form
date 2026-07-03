// Spike entry point for the VJSF-live sandbox (Plan 04, Task 1). This proves
// `<vjsf>` compiles and renders inside doc-next's Vite build, isolated from
// the main SSG app (this file is only ever loaded via editor-sandbox.html,
// never imported from a routed page). Task 3 replaces the hardcoded
// schema/model below with postMessage-driven state from the parent page.
import 'vuetify/styles'
import { createApp, h, ref } from 'vue'
import { createVuetify } from 'vuetify'
import Vjsf from '@koumoul/vjsf'

const vuetify = createVuetify({ theme: { defaultTheme: 'light' } })

const schema = ref({
  type: 'object',
  properties: { name: { type: 'string', title: 'Your name' } },
})
const model = ref({})

const app = createApp({
  render () {
    return h(Vjsf, {
      schema: schema.value,
      modelValue: model.value,
      'onUpdate:modelValue': (value: unknown) => { model.value = value },
    })
  },
})
app.use(vuetify)
app.mount('#sandbox')
