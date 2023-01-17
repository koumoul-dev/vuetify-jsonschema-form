<template>
  <v-container
    fluid
    class="px-0 py-0 vjsf-editor"
    style="height: 100%"
  >
    <!--<h1 class="display-1 mb-4">
      {{ title }}
    </h1>-->
    <v-row
      style="height: 100%"
      class="ma-0"
    >
      <v-col
        cols="4"
        class="pa-0"
      >
        <v-card
          dark
          tile
          flat
          style="height: 100%"
        >
          <!--<v-card-title class="py-1 primary--text" style="position: absolute; width: 100%;">
            Schema
            <v-spacer />
            <div style="width:80px;">
              <v-select v-model="format" :items="['json', 'yaml']" hide-details dense class="mt-0 pb-2" />
            </div>
          </v-card-title>-->
          <!--<v-card-text class="px-0 pb-0" style="height: 100%; padding-top: 40px;">-->
          <v-card-text
            class="px-0 pb-0"
            style="height: 100%;"
          >
            <div
              v-show="format === 'json'"
              id="json-editor"
              style="height: 100%"
            />
            <div
              v-show="format === 'yaml'"
              id="yaml-editor"
              style="height: 100%"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <client-only>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-jsf
              v-model="model"
              :schema="schema"
            >
              <template
                v-slot:custom-tiptap="context"
              >
                <v-jsf-tiptap v-bind="context" />
              </template>
              <template
                v-slot:custom-toast-ui-editor="context"
              >
                <v-jsf-toast-ui-editor v-bind="context" />
              </template>
              <template
                v-slot:custom-avatar="context"
              >
                <v-jsf-crop-img v-bind="context" />
              </template>
            </v-jsf>
          </v-form>
          <v-row class="mt-2">
            <v-spacer />
            <v-btn
              :color="valid ? 'primary' : 'warning'"
              @click="$refs.form.validate()"
            >
              validate
            </v-btn>
            <v-spacer />
          </v-row>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../../lib/deps/third-party.js'
import VJsf from '../../lib/VJsf.js'
import '../../lib/VJsf.css'
import VJsfTiptap from '~/components/wrappers/v-jsf-tiptap.vue'
import VJsfToastUiEditor from '~/components/wrappers/v-jsf-toast-ui-editor.vue'
import VJsfCropImg from '~/components/wrappers/v-jsf-crop-img.vue'
import YAML from 'yaml'

// const ace = require('brace')
// require('brace/mode/json')
// require('brace/mode/yaml')
// const theme = 'ace/theme/monokai'
// const theme = 'ace/theme/vibrant_ink'
// const theme = 'ace/theme/vibrant_ink'
// require('br' + theme)
// require('brace/theme/vibrant_ink')

// cf https://github.com/ajaxorg/ace/wiki/Configuring-Ace
const aceOptions = {
  // showGutter: false,
  showLineNumbers: false,
  fontSize: 14,
  tabSize: 2
}

export default {
  components: { VJsf, VJsfTiptap, VJsfToastUiEditor, VJsfCropImg },
  layout: 'void',
  data: () => ({
    title: 'editor',
    format: 'yaml',
    valid: true,
    schema: {
      'x-options': { editMode: 'inline' },
      type: 'object',
      properties: {
        title: {
          title: 'Title',
          type: 'string'
        }
      }
    },
    model: {}
  }),
  head () {
    return {
      title: 'vjsf - ' + this.title
    }
  },
  watch: {
    format () {
      this.openEditor(this.editors[this.format])
    }
  },
  async mounted () {
    const ace = (await import('brace')).default
    await import('brace/mode/json')
    await import('brace/mode/yaml')
    // const theme = await import('ace/theme/vibrant_ink')
    // const theme = await import('brace/theme/vibrant_ink')
    await this.$nextTick()
    this.editors = {}
    const jsonEditor = this.editors.json = ace.edit('json-editor')
    jsonEditor.setOptions(aceOptions)
    jsonEditor.getSession().setMode('ace/mode/json')
    // jsonEditor.setTheme(theme)
    jsonEditor.setValue(JSON.stringify(this.schema))
    // this.openEditor(jsonEditor)

    const yamlEditor = this.editors.yaml = ace.edit('yaml-editor')
    yamlEditor.setOptions(aceOptions)
    yamlEditor.getSession().setMode('ace/mode/yaml')
    // yamlEditor.setTheme(theme)
    yamlEditor.setValue(YAML.stringify(this.schema))

    jsonEditor.session.on('change', () => {
      if (this.format !== 'json') return
      try {
        this.schema = JSON.parse(jsonEditor.getValue()) || {}
      } catch (err) {
        return
      }
      const schemaYaml = YAML.stringify(this.schema)
      if (schemaYaml !== yamlEditor.getValue()) {
        yamlEditor.setValue(schemaYaml)
      }
    })
    yamlEditor.session.on('change', () => {
      if (this.format !== 'yaml') return
      try {
        this.schema = YAML.parse(yamlEditor.getValue()) || {}
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
    openEditor (editor) {
      editor.focus()
      editor.gotoLine(0)
    }
  }
}
</script>

<style lang="css">
.vjsf-editor .ace-vibrant-ink .ace_keyword, .vjsf-editor .ace-vibrant-ink .ace_meta {
    color: #00BCD4;
}

/*.vjsf-editor .ace_line {
  line-height: 24px;
}*/
</style>
