<script setup lang="ts">
import { computed } from 'vue'

// Read-only static code display for the examples' Schema/Data/Options tabs.
// The input is always our own `JSON.stringify` output (strict JSON), so a
// full grammar library (shiki, CodeMirror) would be dead weight: a
// three-branch tokenizer covers every token JSON.stringify can emit.
const props = defineProps<{ value: unknown }>()

const code = computed(() => JSON.stringify(props.value, null, 2))

// Strings first, so quoted content can never be re-matched as a number or
// keyword. A string directly followed by `:` is an object key.
const TOKEN_RE = /("(?:[^"\\]|\\.)*")(\s*:)?|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b/g

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const html = computed(() => {
  const src = code.value
  let out = ''
  let last = 0
  for (const m of src.matchAll(TOKEN_RE)) {
    out += escapeHtml(src.slice(last, m.index))
    const [full, str, colon] = m
    if (str !== undefined) {
      // `colon` is only whitespace + ':', safe to emit unescaped.
      out += `<span class="${colon === undefined ? 'tok-string' : 'tok-key'}">${escapeHtml(str)}</span>${colon ?? ''}`
    } else if (full === 'true' || full === 'false' || full === 'null') {
      out += `<span class="tok-literal">${full}</span>`
    } else {
      out += `<span class="tok-number">${full}</span>`
    }
    last = m.index + full.length
  }
  return out + escapeHtml(src.slice(last))
})
</script>

<template>
  <!-- v-html is safe here: every non-token slice and every string token goes
  through escapeHtml, and the other tokens can only contain [-0-9.eE+] or a
  true/false/null keyword. -->
  <pre class="code-block"><code v-html="html" /></pre>
</template>

<style scoped>
.code-block {
  margin: 0;
  padding: 12px;
  overflow: auto;
  border-radius: 4px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.85rem;
  white-space: pre;
  /* Token colors follow the CodeMirror one-dark theme the playground's
  editors use, so example blocks and the editor read as the same code. The
  doc shell is dark-only (see src/theme.ts), no light variant needed. */
  color: #abb2bf;
}
/* :deep() because the spans come from v-html and carry no scope attribute. */
.code-block :deep(.tok-key) {
  color: #e06c75;
}
.code-block :deep(.tok-string) {
  color: #98c379;
}
.code-block :deep(.tok-number),
.code-block :deep(.tok-literal) {
  color: #d19a66;
}
</style>
