<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->
  <v-input
    :value="sanitizedHtml"
    :name="fullKey"
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :required="required"
    class="vjsf-tiptap"
  >
    <div
      v-if="htmlDescription"
      class="caption"
      v-html="htmlDescription"
    />
    <tiptap-vuetify
      v-if="!disabled"
      :value="sanitizedHtml"
      :extensions="extensions"
      v-on="{...on, input}"
    />
    <v-card
      v-else
      outlined
    >
      <v-card-text v-html="sanitizedHtml" />
    </v-card>
  </v-input>
</template>

<script>
// cf https://github.com/iliyaZelenko/tiptap-vuetify#npm-es-modules
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import sanitizeHtml from 'sanitize-html'

export default {
  components: { TiptapVuetify },
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
  }),
  computed: {
    sanitizedHtml () {
      return this.value && sanitizeHtml(this.value)
    }
  },
  methods: {
    input (value) {
      if (value === '<p></p>') value = ''
      // sanitizing should also be done when receiving this data in the backend
      this.on.input(sanitizeHtml(value))
    }
  }
}
</script>

<style lang="css">
.vjsf-tiptap .v-input__slot {
  display: block;
}
</style>
