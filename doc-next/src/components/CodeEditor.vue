<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import YAML from 'yaml'
import JSON5 from 'json5'

const props = defineProps<{ modelValue: unknown, language: 'yaml' | 'json' }>()
const emit = defineEmits<{ 'update:modelValue': [v: unknown], 'update:parseError': [e: string | null] }>()

function stringify (v: unknown): string {
  try {
    return props.language === 'yaml' ? YAML.stringify(v) : JSON.stringify(v, null, 2)
  } catch {
    return ''
  }
}
function parse (s: string): unknown {
  return props.language === 'yaml' ? YAML.parse(s) : JSON5.parse(s)
}

const text = ref(stringify(props.modelValue))
// Tracks the *content* (not reference) of the value we last emitted.
// `props.modelValue` never comes back `===` what we just sent: a parent
// `ref()` re-wraps assigned objects in a reactive Proxy, and a value that
// made a round trip through `EditorSandbox`'s postMessage protocol gets
// structurally cloned. Comparing serialized content is what actually tells
// us "this is just our own edit echoing back" vs. "something else changed
// this value" (e.g. typing in the live form).
let lastEmitted = JSON.stringify(props.modelValue)

const apply = useDebounceFn(() => {
  // Empty/whitespace input parses to `undefined` (YAML) or throws (JSON5),
  // either of which would be rejected by the sandbox's `isRenderMessage`
  // guard and leave the preview frozen on the last valid form. Treat it as
  // an empty object instead, so clearing the editor yields an empty form.
  if (!text.value.trim()) {
    lastEmitted = JSON.stringify({})
    emit('update:modelValue', {})
    emit('update:parseError', null)
    return
  }
  try {
    const parsed = parse(text.value)
    lastEmitted = JSON.stringify(parsed)
    emit('update:modelValue', parsed)
    emit('update:parseError', null)
  } catch (err) {
    emit('update:parseError', (err as Error).message)
  }
}, 200)

watch(text, apply)

// Keep the textarea in sync with modelValue changes that originate
// elsewhere (e.g. typing in the live form echoes into the Data tab) — but
// skip re-stringifying our own just-emitted value, or every keystroke would
// bounce back through YAML/JSON formatting and reset the cursor position
// out from under whoever is typing.
watch(() => props.modelValue, (v) => {
  const json = JSON.stringify(v)
  if (json === lastEmitted) return
  lastEmitted = json
  text.value = stringify(v)
})
</script>

<template>
  <v-textarea
    v-model="text"
    :label="language.toUpperCase()"
    variant="outlined"
    auto-grow
    spellcheck="false"
    class="code-editor"
    hide-details
  />
</template>

<style scoped>
.code-editor :deep(textarea) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.85rem;
}
</style>
