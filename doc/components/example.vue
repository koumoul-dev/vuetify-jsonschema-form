<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <h1 class="text-h4 mb-6">
      {{ example.title }}
    </h1>
    <div v-html="marked(example.description)" />

    <v-sheet
      class="my-6"
      border
    >
      <v-toolbar
        density="compact"
        color="#F5F5F5"
      >
        <v-btn
          v-for="tabItem in [
            {value: 'schema', title: 'Schema'},
            {value: 'model', title: 'Data'},
            {value: 'config', title: 'Configuration'}
          ]"
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
          value="schema"
          class="ma-3"
        >
          <pre><code
              class="language-javascript"
              v-html="highlight(example.schema)"
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
          value="config"
          class="ma-3"
        >
          <v-switch
            label="readonly"
            :model-value="mode === 'read'"
            color="primary"
            @update:model-value="value => {mode = value ? 'read' : 'write'}"
          />
        </v-window-item>
      </v-window>

      <v-divider />

      <v-form class="ma-3">
        <slot
          name="vjsf"
          :model-value="model"
          :mode="mode"
          :update-state="updateState"
        >
          <v-jsf
            :model-value="model"
            :schema="example.schema"
            :mode="mode"
            @update:state="updateState"
          />
        </slot>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import { marked } from 'marked'
import { VJsf } from '~/../src/'

Prism.manual = true

export default {
  components: { VJsf },
  props: {
    example: { type: Object, required: true }
  },
  data: () => ({
    model: null,
    tab: null,
    state: null,
    mode: 'write'
  }),
  methods: {
    marked (text) {
      return marked(text, { mangle: false, headerIds: false })
    },
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
