// Message-driven entry point for the VJSF-live sandbox (Plan 04, Task 3).
// This file is only ever loaded via editor-sandbox.html inside a
// `sandbox="allow-scripts"` iframe (deliberately WITHOUT `allow-same-origin`,
// giving it an opaque origin) — it never talks to the parent page except
// through postMessage, and the parent never has direct DOM/JS access to it.
// It renders whatever schema/options/data/theme the parent sends via a
// `render` message and reports back render/update/validation/error state.
import 'vuetify/styles'
import { createApp, h, ref, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'
import Vjsf from '@koumoul/vjsf'
import { isRenderMessage, type SandboxToParent } from './protocol'

const vuetify = createVuetify()
const schema = shallowRef<unknown>(null)
const options = shallowRef<Record<string, unknown>>({})
const model = ref<unknown>({})

function post (msg: SandboxToParent) { parent.postMessage(msg, '*') }

window.addEventListener('message', (e: MessageEvent) => {
  // Only ever trust messages from the embedding parent window, and only
  // once they pass the Task-2 structural guard.
  if (e.source !== parent) return
  if (!isRenderMessage(e.data)) return
  try {
    schema.value = e.data.schema
    options.value = e.data.options
    model.value = e.data.data
    vuetify.theme.change(e.data.theme)
  } catch (err) {
    post({ type: 'error', message: (err as Error).message })
  }
})

const app = createApp({
  render () {
    if (!schema.value) return null
    // Wrapping in <v-form> silences "Vjsf should be wrapped in VForm" and
    // lets Vjsf register/aggregate its own validation state with it.
    return h(VForm, () => h(Vjsf, {
      schema: schema.value as object,
      modelValue: model.value,
      options: options.value,
      'onUpdate:modelValue': (v: unknown) => { model.value = v; post({ type: 'update', data: v }) },
      // VJSF has no dedicated "validation" event: it emits `update:state`
      // with its internal StatefulLayout on every state change, which
      // exposes the current error messages via the `.errors` getter (the
      // same getter it uses internally to report validation state to a
      // wrapping VForm). There is no per-field path in that getter, so all
      // messages are reported together under a single `form` key to fit the
      // `Record<string, string[]>` shape from protocol.ts.
      'onUpdate:state': (state: { errors: string[] }) => {
        post({ type: 'validation', errors: state.errors.length ? { form: state.errors } : {} })
      },
    }))
  },
})

// `compile()` (schema -> layout) and Vjsf's internal watchers run outside of
// the try/catch above (they're deferred to Vue's reactivity flush), so a
// malformed schema throws asynchronously from inside the component tree.
// Vue routes that to the app-level errorHandler instead of leaving it
// unhandled.
app.config.errorHandler = (err) => {
  post({ type: 'error', message: err instanceof Error ? err.message : String(err) })
}

app.use(vuetify)
app.mount('#sandbox')
post({ type: 'ready' })
