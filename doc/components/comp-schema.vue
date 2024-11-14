<template>
  <v-row dense>
    <v-col>
      <v-btn
        variant="text"
        class="text-none"
        :append-icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      >
        {{ name }}
      </v-btn>
    </v-col>
  </v-row>
  <code-block
    v-if="show"
    language="yaml"
    class="pl-6"
  >
    <pre>{{ code }}</pre>
  </code-block>
</template>

<script setup>
import { VBtn, VRow, VCol } from 'vuetify/components'
import { computed, ref } from 'vue'
import yaml from 'yaml'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  schema: {
    type: Object,
    required: true
  }
})

const show = ref(false)

const escapeRegExp = (/** @type {string} */str) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

const removeRegexps = ['type: object', 'additionalProperties: false']
  .map(r => new RegExp(escapeRegExp(r) + '(\\s*)', 'g'))
/** @type {[string, string][]} */
const refsStrings = [
  ['$ref: https://json-layout.github.io/normalized-layout-keyword#/$defs/expression', 'Expression'],
  ['$ref: "#/$defs/expression"', 'Expression'],
  ['$ref: "#/$defs/state-node-options-base"', 'Options'],
  ['$ref: "#/$defs/cols-obj"', 'Responsive cols'],
  ['$ref: "#/$defs/state-node-props-lib"', 'Vuetify props'],
  ['$ref: "#/$defs/state-node-slots-lib"', 'Vuetify slots'],
  ['$ref: "#/$defs/slot"', 'Slot'],
  ['$ref: "#/$defs/children"', 'Children'],
  ['$ref: "#/$defs/child-ref"', 'Child reference'],
  ['$ref: "#/$defs/child-composite"', 'Child info'],
  ['$ref: "#/$defs/select-items"', 'Select items'],
  ['$ref: "#/$defs/get-items"', 'Get select items']
]
/** @type {[RegExp, string][]} */
const replacementRegexps = refsStrings.map(r => ([new RegExp('(\\s*)' + escapeRegExp(r[0]), 'g'), ' ' + r[1]]))
// removeRegexps.push(/^\s*$/g)
// const emptyLinesRegexp = /^\s*$/g

const code = computed(() => {
  const schema = { ...props.schema.properties }
  delete schema.comp
  let code = yaml.stringify(schema)
  for (const r of removeRegexps) {
    code = code.replace(r, '')
  }
  for (const r of replacementRegexps) {
    code = code.replace(r[0], r[1])
  }
  return code
})
</script>
