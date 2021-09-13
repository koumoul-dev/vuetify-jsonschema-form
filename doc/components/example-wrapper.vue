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
      <v-card :dark="dark" outlined>
        <v-toolbar dark dense flat>
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
        <v-alert v-if="ajvError && valid" color="error" dark tile>
          <p>Warning ! V-jsf considered this form valid while a JSON schema validator dit not. This is not normal and you might consider filing a bug report.</p>
          <pre>{{ ajvError }}</pre>
        </v-alert>
        <client-only>
          <v-card-text class="pb-12" style="min-height: 120px; position: relative;">
            <template v-if="activated">
              <v-form ref="form" v-model="valid">
                <example :params="params" />
              </v-form>
              <div style="position:absolute;bottom: 10px;right: 10px;">
                <v-btn :color="validationColor" small fab :title="validated ? 'Reset validation' : 'Validate form'" @click="toggleValidate">
                  <v-icon>{{ validationIcon }}</v-icon>
                </v-btn>
              </div>
            </template>

            <v-overlay :absolute="true" :value="!activated" :opacity="0.2">
              <v-btn icon @click="activated = true">
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </v-overlay>
          </v-card-text>

          <v-window v-model="showCode" vertical>
            <v-window-item />
            <v-window-item>
              <v-card dark tile flat class="pa-0" max-height="350" style="overflow: auto">
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

import jrefs from '../../lib/utils/json-refs'
import Example from './example.js'
import { defaultTemplate } from '../examples'
import pJson from '../../package.json'
const md = require('markdown-it')()
const stringifyObject = require('stringify-object')
const Ajv = require('ajv')
const ajvFormats = require('ajv-formats')
const ajvLocalize = require('ajv-i18n')
const ajv = new Ajv({ strict: false, allErrors: true, messages: false })
ajv.addFormat('hexcolor', /^#[0-9A-Fa-f]{6,8}$/)
ajvFormats(ajv)

export default {
  components: { Example },
  props: {
    params: { type: Object, required: true, default: null },
    startActivated: { type: Boolean, default: false }
  },
  data: () => ({
    showCode: 0,
    valid: null,
    validated: false,
    dark: false,
    activated: false
  }),
  computed: {
    validate() {
      return ajv.compile(jrefs.resolve(this.params.schema, { '~$locale~': (this.params.options && this.params.options.locale) || 'en' }))
    },
    ajvError() {
      const valid = this.validate(this.params.model)
      if (!valid) {
        ajvLocalize.en(this.validate.errors)
        return ajv.errorsText(this.validate.errors, { separator: '\n' })
      }
      return null
    },
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
    validationIcon() {
      if (!this.validated || !this.valid) return 'mdi-checkbox-blank-outline'
      return 'mdi-checkbox-marked-outline'
    },
    codepenParams() {
      const template = this.params.template
      return {
        title: `vjsf - ${this.params.title}`,
        description: this.params.description,
        editors: '101', // HTML=1 CSS=0 JS=1
        html: `<v-app id="app">
  <v-container>
    <p>valid={{valid}}</p>
    <v-form ref="form" v-model="valid">
      ${template || defaultTemplate}
    </v-form>
    <v-layout row class="mt-2">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$refs.form.validate()">Validate</v-btn>
    </v-layout>
  </v-container>
</v-app>`,
        js: `
const model = ${stringifyObject(this.params.model || {})}

const options =  ${stringifyObject(this.params.options || {})}

const schema = ${stringifyObject(this.params.schema)}

Vue.component('VJsf', VJsf.default)

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    model,
    options,
    schema,
    valid: null
  },
  methods: {
    logEvent(key, $event) {
      console.log('vjsf event', key, $event)
    }
  }
})`,
        css_external: `https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900;https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css;https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css;https://cdn.jsdelivr.net/npm/@koumoul/vjsf@${pJson.version}/dist/main.css`,
        js_external: `https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js;https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js;https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js;https://cdn.jsdelivr.net/npm/@koumoul/vjsf@${pJson.version}/dist/main.js;https://cdn.jsdelivr.net/npm/@koumoul/vjsf@${pJson.version}/dist/third-party.js`
      }
    }
  },
  created() {
    this.activated = this.startActivated
  },
  methods: {
    toggleValidate() {
      if (this.validated) {
        this.$refs.form.resetValidation()
      } else {
        this.$refs.form.validate()
      }
      this.validated = !this.validated
    },
    hover() {
      this.activated = true
    }
  }
}
</script>

<style lang="css">

.example-wrapper pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
