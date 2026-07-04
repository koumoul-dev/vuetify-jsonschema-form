<template>
  <v-btn
    :icon="copied ? 'mdi-check' : 'mdi-link-variant'"
    :title="copied ? 'Link copied' : 'Copy link to this section'"
    :aria-label="copied ? 'Link copied' : 'Copy link to this section'"
    class="page-anchor-btn ml-2"
    variant="text"
    color="primary"
    density="comfortable"
    size="x-small"
    @click="copyLink"
  />
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

// Injected after each markdown heading's text by the custom markdown-it-anchor
// permalink (vite.config.ts) as `<CopyAnchor id="slug" />`. The `page-anchor-btn`
// class drives the hover-reveal (src/styles.css) and lets PageToc strip the
// button out of the extracted TOC text. `id` is the heading's anchor slug.
const props = defineProps<{ id: string }>()

const copied = ref(false)
let copiedTimeout: ReturnType<typeof setTimeout> | undefined

async function copyLink () {
  const url = `${window.location.origin}${window.location.pathname}#${props.id}`
  try {
    await navigator.clipboard.writeText(url)
    // Mirror the deep link into the address bar without pushing a history
    // entry (history.state keeps vue-router's scroll state intact).
    history.replaceState(history.state, '', '#' + props.id)
    copied.value = true
    clearTimeout(copiedTimeout)
    copiedTimeout = setTimeout(() => { copied.value = false }, 1500)
  } catch { /* clipboard unavailable (insecure context) — no-op */ }
}

onUnmounted(() => clearTimeout(copiedTimeout))
</script>

<style scoped>
/* Sit the button on the heading's text line. Hover-reveal opacity is global
   (src/styles.css) so the heading:hover parent selector can drive it. */
.page-anchor-btn {
  vertical-align: middle;
}
</style>
