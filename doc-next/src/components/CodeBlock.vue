<script setup lang="ts">
// Read-only static code display. No syntax highlighting yet (a later
// nice-to-have, see Plan 05 Task 3) -- a readable monospace dump is all the
// Schema/Data/Options tabs of VjsfExample need today.
defineProps<{ value: unknown, language?: string }>()
</script>

<template>
  <pre class="code-block" :class="`language-${language ?? 'json'}`"><code>{{ JSON.stringify(value, null, 2) }}</code></pre>
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
}
</style>
