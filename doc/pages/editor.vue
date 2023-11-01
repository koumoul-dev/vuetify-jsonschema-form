<template>
  <v-container
    v-if="schema && options && data"
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col>
        <v-toolbar density="compact">
          <v-btn
            v-for="tabItem in codeTabs"
            :key="tabItem.value"
            class="text-none font-weight-bold"
            size="small"
            :variant="codeTab === tabItem.value ? 'flat' : 'text'"
            :active="codeTab === tabItem.value"
            :color="codeTab === tabItem.value ? 'primary' : ''"
            @click="codeTab = tabItem.value"
          >
            {{ tabItem.title }}
          </v-btn>
          <v-spacer />
        </v-toolbar>

        <v-window v-model="codeTab">
          <v-window-item value="schema">
            <object-editor v-model="schema" />
          </v-window-item>
          <v-window-item value="options">
            <object-editor v-model="options" />
          </v-window-item>
          <v-window-item value="data">
            <object-editor v-model="data" />
          </v-window-item>
        </v-window>
        <v-alert
          v-if="validationErrorsYaml"
          color="error"
          variant="outlined"
          class="pa-2"
        >
          <pre class="text-caption">{{ validationErrorsYaml }}</pre>
        </v-alert>
      </v-col>
      <v-col>
        <v-form
          ref="form"
          v-model="valid"
          class="mr-4"
        >
          <vjsf
            v-model="data"
            v-bind="vjsfParams"
            @update:state="(/** @type {import('@json-layout/core').StatefulLayout} */newState) => state = newState"
          >
            <template #custom-textarea="{node, statefulLayout}">
              <textarea
                :value="node.data"
                style="border: 1px solid red;"
                placeholder="A custom textarea"
                @input="event => statefulLayout.input(node, event.target.value)"
              />
            </template>
            <template #custom-message="{node}">
              This message is defined in a slot (key={{ node.key }})
            </template>
          </vjsf>
          <v-row>
            <v-spacer />
            <v-btn
              :color="validateColor"
              flat
              class="ma-2"
              @click="form?.validate()"
            >
              Validate
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import yaml from 'yaml'
import { Vjsf, defaultOptions } from '@koumoul/vjsf'
import { compile } from '@json-layout/core'
import examples from '~/examples/'

const firstExample = examples[0].examples[0]
const schema = ref(null)
/** @type import('vue').Ref<any | null> */
const options = ref(null)
const data = ref(null)

onMounted(() => {
  const editorStateStr = window.localStorage.getItem('vjsf-editor-state')
  if (editorStateStr) {
    const editorState = JSON.parse(editorStateStr)
    schema.value = editorState.schema
    options.value = editorState.options ?? {}
    data.value = editorState.data ?? {}
  } else {
    schema.value = firstExample.schema
    options.value = firstExample.options ?? {}
    data.value = firstExample.data ?? {}
  }
  watchDebounced([schema, options, data], () => {
    window.localStorage.setItem('vjsf-editor-state', JSON.stringify({
      schema: schema.value,
      options: options.value,
      data: data.value
    }))
  }, { debounce: 500, immediate: true })
})

const codeTabs = [
  { value: 'schema', title: 'Schema' },
  { value: 'options', title: 'Options' },
  { value: 'data', title: 'Data' }
]
const codeTab = ref('schema')

const validationErrors = ref({})
const vjsfParams = ref({})
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
    vjsfParams.value = { precompiledLayout: compiledLayout, options: options.value }
  }
}, { immediate: true })
const validationErrorsYaml = computed(() => Object.keys(validationErrors.value).length ? yaml.stringify(validationErrors.value).trim() : '')

const form = ref(null)
const valid = ref(null)
const validateColor = computed(() => {
  // cf https://vuetifyjs.com/en/components/forms/#validation-state
  if (valid.value === false) return 'error'
  if (valid.value === true) return 'success'
  return 'default'
})

</script>
