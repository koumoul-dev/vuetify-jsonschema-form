<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->
  <v-input :value="value" :name="fullKey" :label="label" :disabled="disabled" :rules="rules" :required="required" class="vjsf-tiptap">
    <tiptap-vuetify :value="value" :extensions="extensions" class="mt-2" v-on="on" />
  </v-input>
</template>

<script>
// cf https://github.com/iliyaZelenko/tiptap-vuetify#npm-es-modules
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

export default {
  components: { TiptapVuetify },
  // available props are the contextual elements passed by v-jsf to its slots
  props: {
    value: { type: String, default: '' },
    fullKey: { type: String, required: true },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rules: { type: Array, required: true },
    on: { type: Object, required: true }
  },
  data: () => ({
    extensions: [
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      HardBreak
    ]
  })
}
</script>

<style lang="css">
.vjsf-tiptap .v-input__slot {
  display: block;
}
</style>-->
