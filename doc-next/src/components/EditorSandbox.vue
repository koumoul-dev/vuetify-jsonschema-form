<script setup lang="ts">
import { ref, watch, onBeforeUnmount, toRaw } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { isSandboxMessage, type RenderMessage } from '../sandbox/protocol'

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
  // The iframe has an opaque origin (sandbox="allow-scripts" with no
  // allow-same-origin), so there is no real origin to target: '*' is the
  // only option, and it's safe here because the message carries no secrets.
  win.postMessage(msg, '*')
}

const debouncedSend = useDebounceFn(send, 200)

useEventListener(window, 'message', (e: MessageEvent) => {
  // Only accept messages that actually come from our own iframe, and only
  // once they pass the Task-2 structural guard — never trust postMessage
  // payloads by shape/type alone.
  if (e.source !== iframeRef.value?.contentWindow) return
  if (!isSandboxMessage(e.data)) return
  if (e.data.type === 'ready') { ready = true; send() } else if (e.data.type === 'update') emit('update', e.data.data)
  else if (e.data.type === 'validation') emit('validation', e.data.errors)
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
