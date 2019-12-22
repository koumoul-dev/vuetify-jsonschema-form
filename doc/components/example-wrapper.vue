<template>
  <v-row>
    <v-col xs="12" sm="12" md="6">
      <h2 v-if="params.title" :id="params.id" class="headline mb-2">
        <v-btn color="primary" icon text :to="{name: 'examples', hash: '#' + params.id}" class="mr-1">
          <v-icon>
            mdi-link
          </v-icon>
        </v-btn>{{ params.title }}
      </h2>
      <p v-if="prettyDescription" v-html="prettyDescription" />
    </v-col>
    <v-col xs="12" sm="12" md="6">
      <v-card>
        <v-toolbar color="primary" dark dense flat>
          <v-spacer />
          <v-btn icon title="show parameters" @click="showCode = showCode ? 0 : 1">
            <v-icon>mdi-code-braces</v-icon>
          </v-btn>
          <v-btn icon title="open example in codepen">
            <v-icon>mdi-codepen</v-icon>
          </v-btn>
        </v-toolbar>
        <client-only>
          <v-card-text class="pb-10">
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

export default {
  components: { Example },
  props: {
    params: { type: Object, required: true, default: null }
  },
  data: () => ({
    showCode: 0,
    valid: null,
    validated: false
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
