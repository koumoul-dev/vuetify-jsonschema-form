<!-- eslint-disable vue/no-v-html -->
<template>
  <v-sheet
    class="my-6"
    border
  >
    <v-toolbar
      density="compact"
      theme="dark"
    >
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
    </v-toolbar>

    <v-divider />

    <v-window
      v-if="tab"
      v-model="tab"
      style="height: 400px;background-color:#F5F5F5;overflow-y: auto;"
    >
      <v-window-item
        value="schemaV2"
        class="ma-3"
      >
        <pre><code
              class="language-javascript"
              v-html="highlight(example.schema)"
        /></pre>
      </v-window-item>

      <v-window-item
        value="schema"
        class="ma-3"
      >
        <pre><code
              class="language-javascript"
              v-html="highlight(schema)"
        /></pre>
      </v-window-item>

      <v-window-item
        value="model"
        class="ma-3"
      >
        <pre><code
              v-if="model !== null && model !== undefined"
              class="language-javascript"
              v-html="highlight(model)"
        /></pre>
      </v-window-item>

      <v-window-item
        value="options"
        class="ma-3"
      >
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
        <v-slider
          v-model="options.titleDepth"
          :min="1"
          :max="6"
          :step="1"
          color="primary"
          label="titleDepth"
          :thumb-label="true"
          style="max-width:300px;"
          hide-details
          density="compact"
          show-ticks="always"
        />
        <pre><code
              class="language-javascript"
              v-html="highlight(options)"
        /></pre>
      </v-window-item>
    </v-window>

    <v-divider />

    <v-form class="ma-3">
      <slot
        name="vjsf"
        :model-value="model"
        :options="options"
        :update-state="updateState"
      >
        <v-jsf
          :model-value="model"
          :schema="schema"
          :options="options"
          @update:state="updateState"
        />
      </slot>
    </v-form>
  </v-sheet>
</template>

<script>
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import { VJsf } from '~/../src/'
import { v2compat } from '~/../src/compat/v2'

Prism.manual = true

export default {
  components: { VJsf },
  props: {
    example: { type: Object, required: true },
    v2: { type: Boolean, default: false }
  },
  data: () => ({
    model: null,
    tab: null,
    state: null,
    options: {
      readOnly: false,
      summary: false,
      titleDepth: 4
    }
  }),
  computed: {
    tabs () {
      const tabs = []
      if (this.v2) tabs.push({ value: 'schemaV2', title: 'Schema V2' })
      tabs.push({ value: 'schema', title: 'Schema' })
      tabs.push({ value: 'model', title: 'Data' })
      tabs.push({ value: 'options', title: 'Options' })
      return tabs
    },
    schema () {
      if (this.v2) return v2compat(this.example.schema)
      return this.example.schema
    },
    changeOption (key) {
      return (value) => {
        this.options = { ...this.options, [key]: value }
      }
    }
  },
  methods: {
    highlight (text) {
      return Prism.highlight(typeof text === 'string' ? text : JSON.stringify(text, null, 2), Prism.languages.javascript, 'javascript')
    },
    updateState (newState) {
      this.state = newState
      this.model = newState.data
    }
  }
}
</script>

<style lang="css" scoped>
</style>
