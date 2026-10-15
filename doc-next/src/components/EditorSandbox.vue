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
// editor-sandbox.html is its own Vite build entry served alongside the SSG
// output, so it needs the same base-path prefix as everything else.
const src = `${import.meta.env.BASE_URL}editor-sandbox.html`
let ready = false
// Content snapshot of the last payload posted, to short-circuit the
// render->update->render feedback loop: without it every keystroke in the
// live form would bounce a redundant `render` back at the iframe.
let lastSentJson: string | null = null

function send () {
  const win = iframeRef.value?.contentWindow
  if (!win || !ready) return
  const msg: RenderMessage = {
    // toRaw(): postMessage's structured clone throws DataCloneError on Vue
    // reactive proxies.
    type: 'render', schema: toRaw(props.schema), options: toRaw(props.options), data: toRaw(props.data), theme: props.theme,
  }
  const json = JSON.stringify(msg)
  if (json === lastSentJson) return
  lastSentJson = json
  // The iframe has an opaque origin, so '*' is the only possible target —
  // safe here, the message carries no secrets.
  win.postMessage(msg, '*')
}

const debouncedSend = useDebounceFn(send, 200)

// Runs the sandboxed form's VForm.validate() — the editor's Validate button
// lives in the parent page, the form it validates lives in the iframe.
function validate () {
  const win = iframeRef.value?.contentWindow
  if (!win || !ready) return
  const msg: ValidateMessage = { type: 'validate' }
  win.postMessage(msg, '*')
}
defineExpose({ validate })

useEventListener(window, 'message', (e: MessageEvent) => {
  // Only accept messages from our own iframe that pass the structural guard.
  if (e.source !== iframeRef.value?.contentWindow) return
  if (!isSandboxMessage(e.data)) return
  if (e.data.type === 'ready') { ready = true; send() } else if (e.data.type === 'update') {
    // The iframe produced this data: record it as sent so the props watcher
    // recognizes the echo and skips re-posting it.
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
