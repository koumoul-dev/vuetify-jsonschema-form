<template>
  <v-container
    v-if="schema"
    fluid
    class="pa-0"
  >
    <v-row dense>
      <v-col
        class="ma-0"
      >
        <div :style="`max-height: ${height}px;overflow-y: auto;`">
          <prism-editor
            v-model="schemaCode"
            class="vjsf-code-editor py-2"
            style="min-height:200px"
            :highlight="highlighter"
            line-numbers
            :readonly="true"
          />
        </div>
      </v-col>
      <v-col>
        <div
          :style="`max-height: ${height}px;overflow-y: auto;`"
          class="pt-2 pr-2"
        >
          <v-form
            v-if="vjsfParams"
            ref="form"
            v-model="valid"
          >
            <vjsf
              v-model="data"
              v-bind="vjsfParams"
            />
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { VContainer, VRow, VCol, VForm } from 'vuetify/components'
import yaml from 'yaml'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import { diffChars, diffWords, diffWordsWithSpace } from 'diff'
import { Vjsf, defaultOptions } from '@koumoul/vjsf'
import '@koumoul/vjsf-markdown'
import { compile } from '@json-layout/core'
import playerSteps from '../assets/player-steps.js'

const schemaCode = ref('')
const schema = ref(null)
/** @type import('vue').Ref<any | null> */
const options = ref({})
const data = ref({})

const highlighter = (/** @type string */code) => {
  return Prism.highlight(code, Prism.languages.yaml, 'yaml')
}

const { height: windowHeight } = useWindowSize()
const height = computed(() => windowHeight.value)

const validationErrors = ref({})
/** @type import('vue').Ref<any | null> */
const vjsfParams = ref(null)
watch([schema, options], () => {
  if (!options.value || !schema.value) return
  let compiledLayout
  try {
    compiledLayout = compile(schema.value, { defaultOptions, ...options.value })
    validationErrors.value = compiledLayout.validationErrors
  } catch (/** @type any */err) {
    validationErrors.value = { '': [err.message] }
  }

  if (!Object.keys(validationErrors.value).length) {
    vjsfParams.value = { precompiledLayout: compiledLayout, options: options.value, schema: schema.value }
  }
}, { immediate: true })

const form = ref(null)
const valid = ref(null)

/**
 * @param {number[]} range
 */
const sleepRange = async ([min, max]) => {
  const duration = Math.random() * (max - min) + min
  return new Promise(resolve => setTimeout(resolve, duration))
}
const ranges = { lineBreak: [100, 200], addChar: [40, 120], removeChar: [20, 60] }

/**
 * @param {any} patch
 * @param {number} index
 * @returns {Promise<number>}
 */
const applyPatch = async (patch, index) => {
  console.log('apply patch', patch)

  if (patch.added) {
    let incIndex = 0
    if (patch.value.endsWith('\n')) {
      schemaCode.value = schemaCode.value.slice(0, index) + '\n' + schemaCode.value.slice(index)
      await sleepRange(ranges.lineBreak)
      patch.value = patch.value.slice(0, -1)
      incIndex++
    }
    for (let i = 0; i < patch.value.length; i++) {
      const char = patch.value[i]
      const charIndex = index + i
      schemaCode.value = schemaCode.value.slice(0, charIndex) + char + schemaCode.value.slice(charIndex)
      if (char === '\n') await sleepRange(ranges.lineBreak)
      else await sleepRange(ranges.addChar)
      incIndex++
    }
    return incIndex
  } else if (patch.removed) {
    for (let charIndex = index + patch.value.length; charIndex > index; charIndex--) {
      schemaCode.value = schemaCode.value.slice(0, charIndex - 1) + schemaCode.value.slice(charIndex)
      await sleepRange(ranges.removeChar)
    }
    return -patch.value.length
  } else {
    return patch.value.length
  }
}

const loop = async () => {
  for (const step of playerSteps.map(s => s.trim())) {
    console.log('apply step', step)
    const diff = diffWordsWithSpace(schemaCode.value, step)
    let index = 0
    for (const patch of diff) {
      const indexDiff = await applyPatch(patch, index)
      console.log('index', indexDiff)
      index += indexDiff
    }
    schemaCode.value = step
  }
}

watch(schemaCode, () => {
  try {
    schema.value = yaml.parse(schemaCode.value)
  } catch (err) {}
})

loop()

definePageMeta({ layout: 'void' })
useHead({ title: 'VJSF - Player' })

// hide scrollbar in this specific page
onMounted(() => {
  document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
})
onUnmounted(() => {
  document.getElementsByTagName('html')[0].style.overflowY = ''
})
</script>
