<!-- eslint-disable vue/no-v-html -->
<template>
  <pre><code
:class="`code-block language-${language}`"
             v-html="html"
  /></pre>
</template>

<script setup>
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import { useSlots } from 'vue'

Prism.manual = true

const props = defineProps({
  language: {
    type: String,
    default: 'javascript'
  }
})

const slots = useSlots()
const code = slots.default?.()[0].children

const html = Prism.highlight(code, Prism.languages[props.language], props.language)
</script>

<style>
.code-block {
  background-color: blue;
}
</style>
