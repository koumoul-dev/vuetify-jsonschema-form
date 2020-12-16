<template>
  <v-container fluid>
    <h1 class="display-1 mb-4">
      {{ title }}
    </h1>
    <v-row>
      <v-col cols="4">
        <v-card dark>
          <v-card-title class="py-1 primary--text">
            Schema
            <v-spacer />
            <div style="width:80px;">
              <v-select v-model="format" :items="['json', 'yaml']" hide-details dense class="mt-0 pb-2" />
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <div v-show="format === 'json'" id="json-editor" style="height: 400px" />
            <div v-show="format === 'yaml'" id="yaml-editor" style="height: 400px" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        {{ schema }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import YAML from 'yaml'

const ace = require('brace')
require('brace/mode/json')
require('brace/mode/yaml')
// const theme = 'ace/theme/monokai'
const theme = 'ace/theme/vibrant_ink'
// require('br' + theme)
require('brace/theme/vibrant_ink')

export default {
  data: () => ({
    title: 'editor',
    format: 'json',
    schema: { test: 'test' }
  }),
  head() {
    return {
      title: 'vjsf - ' + this.title
    }
  },
  watch: {
    format() {
      this.openEditor(this.editors[this.format])
    }
  },
  async mounted() {
    await this.$nextTick()
    this.editors = {}
    const jsonEditor = this.editors.json = ace.edit('json-editor', { autoScrollEditorIntoView: true })
    jsonEditor.getSession().setMode('ace/mode/json')
    jsonEditor.setTheme(theme)
    jsonEditor.setValue(JSON.stringify(this.schema))
    this.openEditor(jsonEditor)

    const yamlEditor = this.editors.yaml = ace.edit('yaml-editor', { autoScrollEditorIntoView: true })
    yamlEditor.getSession().setMode('ace/mode/yaml')
    yamlEditor.setTheme(theme)
    yamlEditor.setValue(YAML.stringify(this.schema))

    jsonEditor.session.on('change', () => {
      if (this.format !== 'json') return
      try {
        this.schema = JSON.parse(jsonEditor.getValue())
      } catch (err) {
        return
      }
      const schemaYaml = YAML.stringify(this.schema)
      if (schemaYaml !== yamlEditor.getValue()) yamlEditor.setValue(schemaYaml)
    })
    yamlEditor.session.on('change', () => {
      if (this.format !== 'yaml') return
      try {
        this.schema = YAML.parse(yamlEditor.getValue())
      } catch (err) {
        return
      }
      const schemaJson = JSON.stringify(this.schema, null, 2)
      if (schemaJson !== jsonEditor.getValue()) {
        jsonEditor.setValue(schemaJson)
      }
    })
  },
  methods: {
    openEditor(editor) {
      editor.focus()
      editor.gotoLine(0)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
