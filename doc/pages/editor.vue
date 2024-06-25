<template>
  <v-container
    v-if="schema && options && data !== undefined"
    fluid
    class="pa-0"
  >
    <v-row dense>
      <v-col
        class="ml-2"
      >
        <v-alert
          variant="outlined"
          :color="errorsYaml ? 'error' : 'grey'"
          class="pa-0"
          :style="`max-height: ${height - 8}px;overflow-y: auto;`"
        >
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
              <object-editor
                v-model="schema"
                @update:parse-error="err => setParseError('schema', err)"
              />
            </v-window-item>
            <v-window-item value="options">
              <object-editor
                v-model="options"
                @update:parse-error="err => setParseError('options', err)"
              />
            </v-window-item>
            <v-window-item value="data">
              <object-editor
                v-model="data"
                @update:parse-error="err => setParseError('schema', err)"
              />
            </v-window-item>
          </v-window>
          <v-alert
            v-if="errorsYaml"
            color="error"
            variant="text"
            class="pa-2"
          >
            <pre class="text-caption">{{ errorsYaml }}</pre>
          </v-alert>
        </v-alert>
      </v-col>
      <v-col>
        <div :style="`max-height: ${height - 8}px;overflow-y: auto;`">
          <v-form
            v-if="vjsfParams"
            ref="form"
            v-model="valid"
            class="mr-4"
          >
            <vjsf
              v-model="data"
              v-bind="vjsfParams"
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
            <v-row class="ma-0">
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted, markRaw } from 'vue'
import { watchDebounced, useWindowSize } from '@vueuse/core'
import { VContainer, VRow, VCol, VSpacer, VForm, VBtn, VAlert, VWindow, VWindowItem, VToolbar } from 'vuetify/components'
import yaml from 'yaml'
import { Vjsf, defaultOptions } from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'
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

const { height: windowHeight } = useWindowSize()
const height = computed(() => windowHeight.value - 56)

const validationErrors = ref({})
/** @type import('vue').Ref<any | null> */
const vjsfParams = ref(null)
watch([schema, options], () => {
  if (!options.value || !schema.value) return
  let compiledLayout
  try {
    compiledLayout = compile(schema.value, {
      ...defaultOptions,
      ...options.value,
      components: { [VjsfMarkdown.info.name]: VjsfMarkdown.info }
    })
    validationErrors.value = compiledLayout.validationErrors
  } catch (/** @type any */err) {
    validationErrors.value = { '': [err.message] }
  }

  if (!Object.keys(validationErrors.value).length) {
    vjsfParams.value = { options: { ...options.value, plugins: [VjsfMarkdown] }, schema: schema.value }
  }
}, { immediate: true })

/** @type Record<string, string> */
const parseErrors = reactive({})
/**
 * @param {string} key
 * @param {string} err
 */
const setParseError = (key, err) => {
  if (err) parseErrors[key] = err
  else delete parseErrors[key]
}

const errorsYaml = computed(() => {
  const fullErrors = { ...parseErrors, ...validationErrors.value }
  return Object.keys(fullErrors).length ? yaml.stringify(fullErrors).trim() : ''
})

const form = ref(null)
const valid = ref(null)
const validateColor = computed(() => {
  // cf https://vuetifyjs.com/en/components/forms/#validation-state
  if (valid.value === false) return 'error'
  if (valid.value === true) return 'success'
  return 'default'
})

useHead({
  title: 'VJSF - Editor'
})

// hide scrollbar in this specific page
onMounted(() => {
  document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
})
onUnmounted(() => {
  document.getElementsByTagName('html')[0].style.overflowY = ''
})
</script>
