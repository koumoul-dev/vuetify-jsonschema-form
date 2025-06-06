<!-- eslint-disable vue/no-v-html -->
<template>
  <v-sheet
    class="my-6"
    border="sm"
    rounded
    color="transparent"
  >
    <v-toolbar
      density="compact"
      color="surface"
      rounded
    >
      <v-btn
        v-for="tabItem in tabs"
        :key="tabItem.value"
        class="text-none font-weight-bold ml-2"
        :variant="tab === tabItem.value ? 'flat' : 'text'"
        :active="tab === tabItem.value"
        :color="tab === tabItem.value ? 'primary' : ''"
        @click="tab = tab === tabItem.value ? null : tabItem.value"
      >
        {{ tabItem.title }}
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        color="primary"
        class="mr-2"
        @click="toggleTheme"
      >
        <v-icon
          v-if="theme === 'light'"
          icon="mdi-weather-night"
        />
        <v-icon
          v-else
          icon="mdi-weather-sunny"
        />
      </v-btn>
      <v-btn
        color="primary"
        icon="mdi-pencil"
        @click="editExample"
      />
    </v-toolbar>

    <v-divider />

    <v-window
      v-if="tab"
      v-model="tab"
      style="height: 600px;overflow-y: auto;"
    >
      <v-window-item
        value="schemaV2"
        class="ma-3"
      >
        <code-block>
          <pre>{{ JSON.stringify(example.schema, null, 2) }}</pre>
        </code-block>
      </v-window-item>

      <v-window-item
        value="schema"
        class="ma-3"
      >
        <code-block>
          <pre>{{ JSON.stringify(schema, null, 2) }}</pre>
        </code-block>
      </v-window-item>

      <v-window-item
        value="model"
        class="ma-3 fill-height"
      >
        <code-block v-if="data !== null && data !== undefined">
          <pre>{{ JSON.stringify(data, null, 2) }}</pre>
        </code-block>
      </v-window-item>

      <v-window-item
        value="slots"
        class="ma-3"
      >
        <code-block
          v-for="key of example.codeSlots"
          :key="key"
        >
          <pre>{{ slotCodes[key] }}</pre>
        </code-block>
      </v-window-item>

      <v-window-item
        value="defaultProps"
        class="ma-3"
      >
        <code-block>
          <pre>{{ JSON.stringify(example.defaultProps, null, 2) }}</pre>
        </code-block>
      </v-window-item>

      <v-window-item
        value="options"
        class="ma-3"
        style="height: 600px"
      >
        <v-row style="height:600px;">
          <v-col>
            <v-defaults-provider :defaults="{ global: { density: 'compact', color: 'primary', hideDetails: true } }">
              <v-switch
                v-model="options.readOnly"
                label="readOnly"
              />

              <v-switch
                v-model="options.summary"
                label="summary"
              />

              <v-switch
                v-model="options.autofocus"
                label="autofocus"
              />

              <v-select
                v-model="options.density"
                style="max-width:300px;"
                :items="['default', 'comfortable', 'compact']"
              />

              <v-switch
                v-model="options.indent"
                label="indent"
              />

              <v-select
                v-model="options.titleDepth"
                label="titleDepth"
                style="max-width:300px;"
                :items="[1, 2, 3, 4, 5, 6]"
              />

              <v-select
                v-model="options.validateOn"
                label="validateOn"
                style="max-width:300px;"
                :items="['input', 'blur', 'submit']"
              />

              <v-select
                v-model="options.initialValidation"
                label="initialValidation"
                style="max-width:300px;"
                :items="['never', 'withData', 'always']"
              />

              <v-select
                v-model="options.updateOn"
                label="updateOn"
                style="max-width:300px;"
                :items="['input', 'blur']"
              />

              <v-select
                v-model="options.defaultOn"
                label="defaultOn"
                style="max-width:300px;"
                :items="['never', 'missing', 'empty']"
              />

              <v-select
                v-model="options.removeAdditional"
                label="removeAdditional"
                style="max-width:300px;"
                :items="['unknown', 'error', 'none']"
              />

              <v-select
                v-model="options.readOnlyPropertiesMode"
                label="readOnlyPropertiesMode"
                style="max-width:300px;"
                :items="['remove', 'hide', 'show']"
              />

              <v-select
                v-model="options.locale"
                label="locale"
                style="max-width:300px;"
                :items="['en', 'fr', 'nl']"
              />

              <v-slider
                v-model="wrapperWidth"
                :min="0"
                :max="100"
                :step="1"
                label="container width"
                style="max-width:600px;"
              >
                <template #append>
                  {{ wrapperWidth }} %
                </template>
              </v-slider>
            </v-defaults-provider>
            <div
              v-if="display"
              class="text-caption ml-2"
            >
              width={{ display.width }}px, display={{ display.name }}
            </div>
          </v-col>
          <v-divider vertical />
          <v-col style="height:600px;overflow-y: auto;">
            <div class="text-subtitle">
              Options filled with default values:
            </div>
            <code-block>
              <pre>{{ JSON.stringify(filledOptions, null, 2) }}</pre>
            </code-block>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>

    <v-theme-provider
      :theme="theme"
      with-background
      class="rounded-b"
    >
      <v-container
        fluid
      >
        <div :style="`width: ${wrapperWidth}%`">
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-defaults-provider :defaults="example.defaultProps || {}">
              <slot
                name="vjsf"
                :model-value="data"
                :options="options"
                :update-state="updateState"
                :update-model-value="modelValue => data = modelValue"
              >
                <vjsf
                  v-model="data"
                  :schema="schema"
                  :options="options"
                  @update:state="updateState"
                >
                  <template #custom-textarea="{ node, statefulLayout }">
                    <textarea
                      :value="node.data"
                      style="border: 1px solid red;"
                      placeholder="A custom textarea"
                      @input="event => statefulLayout.input(node, event.target.value)"
                    />
                  </template>
                  <template #custom-message="{ node, prop1 }">
                    This message is defined in a slot (key={{ node.key }}, data={{ node.data }}, additional prop={{ prop1 }})
                  </template>
                </vjsf>
              </slot>
            </v-defaults-provider>
            <v-row class="ma-0">
              <v-spacer />
              <v-btn
                :color="validateColor"
                flat
                class="mt-2"
                @click="$refs.form.validate()"
              >
                Validate
              </v-btn>
            </v-row>
          </v-form>
        </div>
      </v-container>
    </v-theme-provider>
  </v-sheet>
</template>

<script>
import Vjsf from '@koumoul/vjsf'
import VjsfMarkdown from '@koumoul/vjsf-markdown'
import VjsfImgCropper from '@koumoul/vjsf-img-cropper'
import { v2compat } from '@koumoul/vjsf/compat/v2'
import { VIcon, VContainer, VRow, VCol, VSpacer, VForm, VBtn, VDivider, VSelect, VSwitch, VToolbar, VSheet, VWindow, VSlider, VWindowItem, VDefaultsProvider, VThemeProvider } from 'vuetify/components'
import slotCodes from '../examples/slot-codes.js'

export default {
  components: { Vjsf, VIcon, VContainer, VRow, VCol, VSpacer, VForm, VBtn, VDivider, VSelect, VSwitch, VToolbar, VSheet, VWindow, VSlider, VWindowItem, VDefaultsProvider, VThemeProvider },
  props: {
    example: {
      /** @type import('vue').PropType<import('../examples/types.js').VJSFExample> */
      type: Object,
      required: true,
    },
    v2: { type: Boolean, default: false },
  },
  data: () => ({
    /** @type unknown */
    data: null,
    /** @type string | null */
    tab: null,
    /** @type import('@json-layout/core').StateTree | null */
    stateTree: null,
    /** @type import('@json-layout/core').Display | null */
    display: null,
    options: {
      readOnly: false,
      summary: false,
      density: 'comfortable',
      indent: false,
      titleDepth: 2,
      validateOn: 'input',
      initialValidation: 'withData',
      updateOn: 'input',
      debounceInputMs: 300,
      defaultOn: 'empty',
      removeAdditional: 'error',
      autofocus: false,
      readOnlyPropertiesMode: 'show',
      locale: 'en',
      plugins: [VjsfMarkdown, VjsfImgCropper],
    },
    /** @type import('@json-layout/core').StatefulLayoutOptions | null */
    filledOptions: null,
    wrapperWidth: 100,
    slotCodes,
    valid: null,
    theme: 'light',
  }),
  computed: {
    tabs() {
      const tabs = []
      if (this.v2) tabs.push({ value: 'schemaV2', title: 'Schema V2' })
      tabs.push({ value: 'schema', title: 'Schema' })
      tabs.push({ value: 'model', title: 'Data' })
      if (this.example.codeSlots?.length) {
        tabs.push({ value: 'slots', title: 'Slots' })
      }
      if (this.example.defaultProps) {
        tabs.push({ value: 'defaultProps', title: 'Default props' })
      }
      tabs.push({ value: 'options', title: 'Options' })
      return tabs
    },
    schema() {
      if (this.v2) return v2compat(this.example.schema)
      return this.example.schema
    },
    changeOption(/** @type string  */key) {
      return (/** @type any */value) => {
        this.options = { ...this.options, [key]: value }
      }
    },
    validateColor() {
      // cf https://vuetifyjs.com/en/components/forms/#validation-state
      if (this.valid === false) return 'error'
      if (this.valid === true) return 'success'
      return 'default'
    },
  },
  created() {
    if (this.example.options) Object.assign(this.options, this.example.options)
    if (this.example.data) this.data = JSON.parse(JSON.stringify(this.example.data))
  },
  methods: {
    updateState(/** @type import('@json-layout/core').StatefulLayout */newState) {
      this.stateTree = newState.stateTree
      this.display = newState.display
      this.filledOptions = { ...newState.options }
      delete this.filledOptions.vjsfSlots
      delete this.filledOptions.nodeComponents
      delete this.filledOptions.components
      delete this.filledOptions.plugins
    },
    editExample() {
      /** @type {any} */
      const editOptions = { ...this.options }
      delete editOptions.plugins
      localStorage.setItem('vjsf-editor-state', JSON.stringify({
        schema: this.schema,
        options: editOptions,
        data: this.data,
      }))
      this.$router.push('/editor')
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
  },
}
</script>

<style lang="css" scoped>
</style>
