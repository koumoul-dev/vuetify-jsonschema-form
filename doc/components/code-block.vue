<!-- eslint-disable vue/no-v-html -->
<template>
  <pre class="code-block"><code
:class="`language-${language}`"
             v-html="html"
  /></pre>
</template>

<script setup>
import Prism from '../assets/prism.js'
import { useSlots, computed } from 'vue'

Prism.manual = true

const props = defineProps({
  language: {
    type: String,
    default: 'javascript'
  }
})

const slots = useSlots()

const html = computed(() => {
  const code = slots.default?.()[0].children
  if (!code) return ''
  return Prism.highlight(code, Prism.languages[props.language], props.language)
})
</script>

<style>
.code-block {
  background-color: white;
  padding: 8px;
  border-radius: 4px;
}
</style>
