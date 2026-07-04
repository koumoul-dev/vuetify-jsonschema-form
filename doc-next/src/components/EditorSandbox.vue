<script setup lang="ts">
import { ref, watch, onBeforeUnmount, toRaw } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { isSandboxMessage, type RenderMessage, type ValidateMessage } from '../sandbox/protocol'

const props = defineProps<{
  schema: unknown
  options: Record<string, unknown>
  data: unknown
  theme: 'light' | 'dark'
}>()
const emit = defineEmits<{
  update: [data: unknown]
  validation: [errors: Record<string, string[]>]
  error: [message: string]
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)
// `editor-sandbox.html` is its own Vite build entry (see doc-next/vite.config.ts
// rollupOptions.input.sandbox) served as a static file alongside the SSG
// output, so it needs the same base-path prefix as everything else.
const src = `${import.meta.env.BASE_URL}editor-sandbox.html`
let ready = false
// Snapshot (by content, via JSON) of the last payload actually posted to the
// iframe. Used to short-circuit the render->update->render feedback loop
// below: without it, every keystroke in the live form would immediately
// bounce a redundant `render` back at the iframe with data it already has,
// reassigning VJSF's `modelValue` prop to a freshly-cloned (but content-
// identical) object on every character typed — at best wasted work, at
// worst a source of jank/focus loss while typing.
let lastSentJson: string | null = null

function send () {
  const win = iframeRef.value?.contentWindow
  if (!win || !ready) return
  const msg: RenderMessage = {
    // toRaw() is required here: schema/options/data are typically backed by
    // Vue reactive proxies (e.g. a parent `ref({...})`), and the structured
    // clone algorithm postMessage uses under the hood throws
    // `DataCloneError: ... could not be cloned` on those proxies. toRaw()
    // unwraps to the plain underlying object graph, which clones fine (same
    // reasoning as the toRaw() calls in lib/src/composables/use-vjsf.js).
    type: 'render', schema: toRaw(props.schema), options: toRaw(props.options), data: toRaw(props.data), theme: props.theme,
  }
  const json = JSON.stringify(msg)
  if (json === lastSentJson) return
  lastSentJson = json
  // The iframe has an opaque origin (sandbox="allow-scripts" with no
  // allow-same-origin), so there is no real origin to target: '*' is the
  // only option, and it's safe here because the message carries no secrets.
  win.postMessage(msg, '*')
}

const debouncedSend = useDebounceFn(send, 200)

// Runs the sandboxed form's VForm.validate() — used by the editor's
// Validate button (validateOn: 'submit' mode), which lives in the parent
// page while the form it validates lives in the iframe.
function validate () {
  const win = iframeRef.value?.contentWindow
  if (!win || !ready) return
  const msg: ValidateMessage = { type: 'validate' }
  win.postMessage(msg, '*')
}
defineExpose({ validate })

useEventListener(window, 'message', (e: MessageEvent) => {
  // Only accept messages that actually come from our own iframe, and only
  // once they pass the Task-2 structural guard — never trust postMessage
  // payloads by shape/type alone.
  if (e.source !== iframeRef.value?.contentWindow) return
  if (!isSandboxMessage(e.data)) return
  if (e.data.type === 'ready') { ready = true; send() } else if (e.data.type === 'update') {
    // The iframe already reflects this data — it's the one that produced it.
    // Record it as if we'd just sent it so the props.data watcher below
    // (triggered once the parent's `data` ref round-trips through `@update`)
    // recognizes the echo and skips re-posting it (see `lastSentJson` above).
    if (lastSentJson) {
      const prev = JSON.parse(lastSentJson) as RenderMessage
      lastSentJson = JSON.stringify({ ...prev, data: e.data.data })
    }
    emit('update', e.data.data)
  } else if (e.data.type === 'validation') emit('validation', e.data.errors)
  else if (e.data.type === 'error') emit('error', e.data.message)
})

watch(() => [props.schema, props.options, props.data, props.theme], debouncedSend, { deep: true })
onBeforeUnmount(() => { ready = false })
</script>

<template>
  <iframe
    ref="iframeRef"
    :src="src"
    sandbox="allow-scripts"
    title="VJSF live preview"
    style="width: 100%; height: 100%; border: 0"
  />
</template>
