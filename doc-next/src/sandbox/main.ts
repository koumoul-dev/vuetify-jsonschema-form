// Entry point for the VJSF live-preview sandbox, loaded via editor-sandbox.html
// inside a `sandbox="allow-scripts"` iframe (no `allow-same-origin`, so an
// opaque origin): it only talks to the parent through postMessage — renders
// what a `render` message carries and reports update/validation/error state.
import 'vuetify/styles'
import { createApp, h, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'
import Vjsf from '@koumoul/vjsf'
import { vuetifyTheme } from '../utils/theme'
import { isRenderMessage, isValidateMessage, type SandboxToParent } from './protocol'

// Same theme definitions as the parent doc app, so both sides resolve e.g.
// 'dark' to the same colors; every render message carries the theme to display.
const vuetify = createVuetify({ theme: vuetifyTheme })
const schema = shallowRef<unknown>(null)
const options = shallowRef<Record<string, unknown>>({})
const model = shallowRef<unknown>({})
// Used as Vjsf's `:key`, bumped when schema/options content actually changes:
// VJSF's in-place schema hot-swap silently drops freshly-added properties
// (see BUGS.md), so each schema edit remounts a fresh form instead.
let schemaVersion = 0
let lastSchemaOptionsJson: string | null = null

function post (msg: SandboxToParent) { parent.postMessage(msg, '*') }

window.addEventListener('message', (e: MessageEvent) => {
  // only trust messages from the embedding parent window
  if (e.source !== parent) return
  // The editor's Validate button lives in the parent; the form lives here.
  if (isValidateMessage(e.data)) {
    formEl?.validate()
    return
  }
  if (!isRenderMessage(e.data)) return
  try {
    const schemaOptionsJson = JSON.stringify([e.data.schema, e.data.options])
    if (schemaOptionsJson !== lastSchemaOptionsJson) {
      lastSchemaOptionsJson = schemaOptionsJson
      schemaVersion++
      // Every postMessage delivers a fresh clone: reassigning unconditionally
      // would force a full remount on every theme toggle or data-tab edit.
      schema.value = e.data.schema
      options.value = e.data.options
    }
    model.value = e.data.data
    vuetify.theme.change(e.data.theme)
  } catch (err) {
    post({ type: 'error', message: (err as Error).message })
  }
})

// ref on the VForm, for the validate message handler
let formEl: InstanceType<typeof VForm> | null = null

const app = createApp({
  render () {
    if (!schema.value) return null
    // Wrapping in <v-form> silences "Vjsf should be wrapped in VForm" and
    // lets Vjsf register/aggregate its own validation state with it.
    return h(VForm, {
      ref: (el) => { formEl = el as InstanceType<typeof VForm> | null },
    }, () => h(Vjsf, {
      key: schemaVersion,
      schema: schema.value as object,
      modelValue: model.value,
      options: options.value,
      'onUpdate:modelValue': (v: unknown) => { model.value = v; post({ type: 'update', data: v }) },
      // VJSF has no dedicated validation event: `update:state` exposes the
      // current error messages via `.errors`, without per-field paths — so
      // everything is reported under a single `form` key.
      'onUpdate:state': (state: { errors: string[] }) => {
        post({ type: 'validation', errors: state.errors.length ? { form: state.errors } : {} })
      },
    }))
  },
})

// compile() and Vjsf's watchers run in Vue's reactivity flush, so a malformed
// schema throws asynchronously — Vue routes that to the app-level errorHandler.
app.config.errorHandler = (err) => {
  post({ type: 'error', message: err instanceof Error ? err.message : String(err) })
}

app.use(vuetify)
app.mount('#sandbox')
post({ type: 'ready' })
