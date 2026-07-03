<script lang="ts">
import MarkdownIt from 'markdown-it'

// Module-scope singleton (not created inside <script setup>) so every
// MarkdownInline instance on a category page (title/warning/description for
// each of up to ~15 examples) shares one parser instead of paying
// MarkdownIt's setup cost per instance. `html: false` keeps example
// descriptions (untrusted-ish, sourced from the examples data files) from
// injecting raw HTML through `v-html` below; `linkify: true` matches the old
// doc site's `marked` defaults (bare URLs in descriptions auto-link).
const md = new MarkdownIt({ html: false, linkify: true })
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ content?: string }>()

// Block-mode render (not renderInline): several category/example
// descriptions in the ported examples data are multi-paragraph or contain
// lists (see e.g. @json-layout/examples' formats/validation categories).
const rendered = computed(() => (props.content ? md.render(props.content) : ''))
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="content" class="markdown-inline" v-html="rendered" />
</template>

<style scoped>
.markdown-inline :deep(p:not(:last-child)),
.markdown-inline :deep(pre:not(:last-child)) {
  margin-bottom: 20px;
}
.markdown-inline :deep(ul),
.markdown-inline :deep(ol) {
  margin-left: 28px;
  margin-bottom: 16px;
}
.markdown-inline :deep(code) {
  background: rgba(var(--v-theme-on-surface), 0.08);
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
