<template>
  <v-row class="example-wrapper">
    <v-col xs="12" sm="12" md="6">
      <h2 v-if="params.title" :id="params.id" class="headline mb-2 pt-2">
        <v-btn color="primary" icon text :to="{name: 'examples', hash: '#' + params.id}" class="mr-1">
          <v-icon>
            mdi-link
          </v-icon>
        </v-btn>{{ params.title }}
      </h2>
      <p v-if="prettyDescription" v-html="prettyDescription" />
    </v-col>
    <v-col xs="12" sm="12" md="6" class="mt-2">
      <v-card :dark="dark">
        <v-toolbar color="primary" dark dense flat>
          <v-spacer />
          <v-btn icon title="dark mode / light mode" @click="dark = !dark">
            <v-icon>mdi-invert-colors</v-icon>
          </v-btn>
          <v-btn icon title="show parameters" @click="showCode = showCode ? 0 : 1">
            <v-icon>mdi-code-braces</v-icon>
          </v-btn>
          <form action="https://codepen.io/pen/define" method="POST" target="_blank">
            <input type="hidden" name="data" :value="JSON.stringify(codepenParams)">
            <v-btn icon title="open example in codepen" type="submit">
              <v-icon>mdi-codepen</v-icon>
            </v-btn>
          </form>
        </v-toolbar>
        <client-only>
          <v-card-text class="pb-12">
            <v-form ref="form" v-model="valid">
              <example :model="params.model" :schema="params.schema" :options="params.options || {}" :template="params.template" />
            </v-form>
            <div style="position:absolute;bottom: 10px;right: 10px;">
              <v-btn :color="validationColor" small fab :title="validated ? 'Reset validation' : 'Validate form'" @click="toggleValidate">
                <v-icon>{{ valid ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline' }}</v-icon>
              </v-btn>
            </div>
          </v-card-text>

          <v-window v-model="showCode" vertical>
            <v-window-item />
            <v-window-item>
              <v-card dark tile flat class="pa-0" max-height="350" style="overflow-y: auto">
                <v-tabs>
                  <v-tabs-slider />

                  <v-tab v-if="params.template" :href="`#tab-${params.id}-template`">
                    Template
                  </v-tab>
                  <v-tab-item :value="`tab-${params.id}-template`">
                    <v-sheet dark class="pa-2" tile>
                      <pre v-html="prettyTemplate" />
                    </v-sheet>
                  </v-tab-item>

                  <v-tab v-if="params.options" :href="`#tab-${params.id}-options`">
                    Options
                  </v-tab>
                  <v-tab-item :value="`tab-${params.id}-options`">
                    <v-sheet dark class="pa-2" tile>
                      <pre v-html="prettyOptions" />
                    </v-sheet>
                  </v-tab-item>

                  <v-tab :href="`#tab-${params.id}-schema`">
                    Schema
                  </v-tab>
                  <v-tab-item :value="`tab-${params.id}-schema`">
                    <v-sheet dark class="pa-2" tile>
                      <pre v-html="prettySchema" />
                    </v-sheet>
                  </v-tab-item>

                  <v-tab :href="`#tab-${params.id}-model`">
                    Model
                  </v-tab>
                  <v-tab-item :value="`tab-${params.id}-model`">
                    <v-sheet dark class="pa-2" tile>
                      <pre v-html="prettyModel" />
                    </v-sheet>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-window-item>
          </v-window>
        </client-only>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import Example from './example.js'
const md = require('markdown-it')()
const stringifyObject = require('stringify-object')

export default {
  components: { Example },
  props: {
    params: { type: Object, required: true, default: null }
  },
  data: () => ({
    showCode: 0,
    valid: null,
    validated: false,
    dark: false
  }),
  computed: {
    prettySchema() {
      if (!this.$hljs || !this.params.schema) return null
      return this.$hljs.highlight('json', JSON.stringify(this.params.schema, null, 2)).value
    },
    prettyModel() {
      if (!this.$hljs || !this.params.model) return null
      return this.$hljs.highlight('json', JSON.stringify(this.params.model, null, 2)).value
    },
    prettyOptions() {
      if (!this.$hljs || !this.params.options) return null
      return this.$hljs.highlight('json', JSON.stringify(this.params.options, null, 2)).value
    },
    prettyDescription() {
      return md.render(this.params.description || '')
    },
    prettyTemplate() {
      if (!this.$hljs || !this.params.template) return null
      return this.$hljs.highlight('html', this.params.template).value
    },
    validationColor() {
      if (this.valid) return 'success'
      else if (!this.validated) return 'light'
      else return 'error'
    },
    codepenParams() {
      const template = this.params.template || `<v-jsf :model="model" :options="options" :schema="schema" />`
      return {
        title: `vjsf - ${this.params.title}`,
        description: this.params.description,
        editors: '101', // HTML=1 CSS=0 JS=1
        html: `<v-app>
  ${template}
</v-app>`,
        js: `
const model = ${stringifyObject(this.params.model || {})}

const options =  ${stringifyObject(this.params.options) || {}}

const schema = ${stringifyObject(this.params.schema)}

new Vue({
  el: 'v-app',
  data: {
    model,
    options,
    schema
  }
});`,
        css_external: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900;https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css;https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css;https://cdn.jsdelivr.net/npm/@koumoul/vuetify-jsonschema-form@0.26/dist/main.css',
        js_external: 'https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js;https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js;https://cdn.jsdelivr.net/npm/@koumoul/vuetify-jsonschema-form@0.26/dist/main.js'
      }
    }
  },
  methods: {
    toggleValidate() {
      if (this.validated) {
        this.$refs.form.resetValidation()
      } else {
        this.$refs.form.validate()
      }
      this.validated = !this.validated
    }
  }
}
</script>

<style lang="css" scoped>
</style>
