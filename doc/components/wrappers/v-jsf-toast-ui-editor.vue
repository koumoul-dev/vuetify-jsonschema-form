<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->
  <v-input :value="value" :name="fullKey" :label="label" :disabled="disabled" :rules="rules" :required="required" class="vjsf-tiptap">
    <div v-if="htmlDescription" class="caption" v-html="htmlDescription" />
    <editor v-if="!disabled"
            ref="toastuiEditor"
            :initial-value="value"
            initial-edit-type="wysiwyg"
            height="auto"
            class="mt-2"
            v-on="{...on, change}"
    />
    <v-card v-else outlined>
      <v-card-text class="pb-0" v-html="sanitizedHtml" />
    </v-card>
  </v-input>
</template>

<script>
// cf https://github.com/nhn/tui.editor/tree/master/apps/vue-editor
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import sanitizeHtml from 'sanitize-html'

export default {
  components: { Editor },
  // available props are the contextual elements passed by v-jsf to its slots
  props: {
    value: { type: String, default: '' },
    options: { type: Object, required: true },
    schema: { type: Object, required: true },
    fullSchema: { type: Object, required: true },
    fullKey: { type: String, required: true },
    label: { type: String, default: '' },
    htmlDescription: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rules: { type: Array, required: true },
    on: { type: Object, required: true }
  },
  computed: {
    sanitizedHtml() {
      return this.disabled && this.value && sanitizeHtml(this.options.markdown(this.value))
    }
  },
  methods: {
    change() {
      const markdown = this.$refs.toastuiEditor.invoke('getMarkdown')
      this.on.input(markdown)
    }
  }
}
</script>

<style lang="css">
.vjsf-tiptap .v-input__slot {
  display: block;
}
</style>-->
