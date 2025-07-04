<template>
  <v-sheet
    style="position:relative;background-color:white;"
  >
    <v-btn-group
      class="rounded-0 rounded-bs-xl"
      rounded="bs"
      density="compact"
      variant="elevated"
      elevation="1"
      style="position:absolute;top:0;right:0;z-index:200;height:24px;"
    >
      <v-btn
        size="small"
        :color="language === 'json' ? 'primary' : ''"
        @click="language = 'json'"
      >
        JSON
      </v-btn>
      <v-btn
        size="small"
        :color="language === 'yaml' ? 'primary' : ''"
        @click="language = 'yaml'"
      >
        YAML
      </v-btn>
      <v-btn
        v-if="!readonly"
        size="small"
        @click="code = format(insideValue)"
      >
        <v-icon>mdi-format-align-left</v-icon>
      </v-btn>
    </v-btn-group>
    <prism-editor
      v-model="code"
      class="vjsf-code-editor py-2"
      :style="`min-height:200px; background-color: ${$vuetify.theme.current.colors.background}`"
      :highlight="highlighter"
      line-numbers
      :readonly="readonly"
      @update:model-value="updateCode"
    />
  </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue'
import { VSheet, VBtn, VBtnGroup, VIcon } from 'vuetify/components'
import yaml from 'yaml'
import JSON5 from 'json5'
import Prism, { PrismEditor } from '../assets/prism.js'

Prism.manual = true

const props = defineProps({
  modelValue: {
    type: [Object, String, Number, Boolean, Array],
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  defaultLanguage: {
    type: String,
    default: 'json',
  },
})

const emits = defineEmits(['update:modelValue', 'update:parseError'])

const insideValue = ref({})
const language = ref(props.defaultLanguage)
const code = ref('{}')

/**
 * @param {string} code
 * @param {string} [lang]
 */
const parse = (code, lang) => {
  lang = lang ?? language.value
  return lang === 'yaml' ? yaml.parse(code) : JSON5.parse(code)
}
/**
 * @param {object} value
 * @param {string} [lang]
 */
const format = (value, lang) => {
  lang = lang ?? language.value
  return lang === 'yaml' ? yaml.stringify(value) : JSON.stringify(value, null, 2)
}

watch(language, () => {
  code.value = format(insideValue.value)
})
const updateCode = (/** @type string */code) => {
  try {
    insideValue.value = parse(code)
    emits('update:modelValue', insideValue.value)
    emits('update:parseError', null)
  }
  catch (/** @type any */err) {
    emits('update:parseError', err.message)
  }
}

// when the model is changed from outside
watch(() => props.modelValue, () => {
  if (props.modelValue !== insideValue.value) {
    insideValue.value = JSON.parse(JSON.stringify(props.modelValue))
    code.value = format(insideValue.value)
  }
}, { immediate: true })

const highlighter = (/** @type string */code) => {
  return Prism.highlight(code, Prism.languages[language.value], language.value)
}
</script>

<style>
/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
