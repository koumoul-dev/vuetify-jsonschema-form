<!-- eslint-disable vue/no-v-html -->
<template>
  <v-sheet
    class="my-6"
    border
    rounded
    color="transparent"
  >
    <v-toolbar density="compact">
      <v-btn
        v-for="tabItem in tabs"
        :key="tabItem.value"
        class="text-none font-weight-bold"
        size="small"
        variant="text"
        :active="tab === tabItem.value"
        @click="tab = tab === tabItem.value ? null : tabItem.value"
      >
        {{ tabItem.title }}
      </v-btn>
      <v-spacer />
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
      style="height: 400px;overflow-y: auto;"
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
        value="options"
        class="ma-3"
        style="height: 400px"
      >
        <v-row style="height:400px;">
          <v-col>
            <v-switch
              v-model="options.readOnly"
              label="readOnly"
              color="primary"
              hide-details
              density="compact"
            />
            <v-switch
              v-model="options.summary"
              label="summary"
              color="primary"
              hide-details
              density="compact"
            />
            <!--<v-slider
          v-model="options.titleDepth"
          :min="1"
          :max="6"
          :step="1"
          color="primary"
          label="titleDepth"
          style="max-width:300px;"
          hide-details
          density="compact"
          show-ticks="always"
        >
          <template #append>
            h{{ options.titleDepth }}
          </template>
        </v-slider>-->
            <v-select
              v-model="options.density"
              density="compact"
              hide-details
              label="density"
              style="max-width:300px;"
              :items="['default', 'comfortable', 'compact']"
            />

            <v-select
              v-model="options.initialValidation"
              density="compact"
              hide-details
              label="initialValidation"
              style="max-width:300px;"
              :items="['never', 'withData', 'always']"
            />

            <v-select
              v-model="options.validateOn"
              density="compact"
              hide-details
              label="validateOn"
              style="max-width:300px;"
              :items="['input', 'blur', 'submit']"
            />

            <v-select
              v-model="options.locale"
              density="compact"
              hide-details
              label="locale"
              style="max-width:300px;"
              :items="['en', 'fr']"
            />

            <v-slider
              v-model="wrapperWidth"
              :min="0"
              :max="100"
              :step="1"
              color="primary"
              label="container width"
              style="max-width:500px;"
              hide-details
              density="compact"
            >
              <template #append>
                {{ wrapperWidth }} %
              </template>
            </v-slider>
            <div
              v-if="display"
              class="text-caption ml-2"
            >
              width={{ display.width }}px, display={{ display.name }}
            </div>
          </v-col>
          <v-divider vertical />
          <v-col style="height:400px;overflow-y: auto;">
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

    <v-divider />

    <v-container fluid>
      <v-lazy :min-height="120">
        <div :style="`width: ${wrapperWidth}%`">
          <v-form
            ref="form"
            v-model="valid"
          >
            <slot
              name="vjsf"
              :model-value="data"
              :options="options"
              :update-state="updateState"
            >
              <vjsf
                :model-value="data"
                :schema="schema"
                :options="options"
                @update:state="updateState"
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
            </slot>
            <v-row>
              <v-spacer />
              <v-btn
                :color="validateColor"
                flat
                class="ma-2"
                @click="$refs.form.validate()"
              >
                Validate
              </v-btn>
            </v-row>
          </v-form>
        </div>
      </v-lazy>
    </v-container>
  </v-sheet>
</template>

<script>
import Vjsf from '@koumoul/vjsf'
import '@koumoul/vjsf-markdown'
import { v2compat } from '@koumoul/vjsf/compat/v2'
import { VContainer, VRow, VCol, VSpacer, VForm, VBtn, VDivider, VSelect, VSwitch, VToolbar, VSheet, VWindow, VSlider, VWindowItem, VLazy } from 'vuetify/components'
import slotCodes from '../examples/slot-codes.js'

export default {
  components: { Vjsf, VContainer, VRow, VCol, VSpacer, VForm, VBtn, VDivider, VSelect, VSwitch, VToolbar, VSheet, VWindow, VSlider, VWindowItem, VLazy },
  props: {
    example: {
      /** @type import('vue').PropType<import('@json-layout/examples').JSONLayoutExample> */
      type: Object,
      required: true
    },
    v2: { type: Boolean, default: false }
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
      density: 'default',
      initialValidation: 'withData',
      validateOn: 'input',
      locale: 'en'
    },
    /** @type import('@json-layout/core').StatefulLayoutOptions | null */
    filledOptions: null,
    wrapperWidth: 100,
    slotCodes,
    valid: null
  }),
  computed: {
    tabs () {
      const tabs = []
      if (this.v2) tabs.push({ value: 'schemaV2', title: 'Schema V2' })
      tabs.push({ value: 'schema', title: 'Schema' })
      tabs.push({ value: 'model', title: 'Data' })
      if (this.example.codeSlots?.length) {
        tabs.push({ value: 'slots', title: 'Slots' })
      }
      tabs.push({ value: 'options', title: 'Options' })
      return tabs
    },
    schema () {
      if (this.v2) return v2compat(this.example.schema)
      return this.example.schema
    },
    changeOption (/** @type string  */key) {
      return (/** @type any */value) => {
        this.options = { ...this.options, [key]: value }
      }
    },
    validateColor () {
      // cf https://vuetifyjs.com/en/components/forms/#validation-state
      if (this.valid === false) return 'error'
      if (this.valid === true) return 'success'
      return 'default'
    }
  },
  created () {
    if (this.example.options) Object.assign(this.options, this.example.options)
    if (this.example.data) this.data = JSON.parse(JSON.stringify(this.example.data))
  },
  methods: {
    updateState (/** @type import('@json-layout/core').StatefulLayout */newState) {
      this.stateTree = newState.stateTree
      this.data = newState.data
      this.display = newState.display
      this.filledOptions = newState.options
    },
    editExample () {
      localStorage.setItem('vjsf-editor-state', JSON.stringify({
        schema: this.schema,
        options: this.options,
        data: this.data
      }))
      this.$router.push('/editor')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
