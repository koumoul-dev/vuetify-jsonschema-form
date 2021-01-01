const id = 'slots-wrappers'

const title = 'Slots and components'

const description = `The slots can be used to extend vjsf capabilities by integrating third-party components.

In this case it is recommended to write wrapper components similar to v-jsf-tiptap that wrap [tiptap-vuetify](https://github.com/iliyaZelenko/tiptap-vuetify) in this example.`

const schema = {
  type: 'object',
  required: ['richTextProp'],
  properties: {
    richTextProp: { type: 'string', title: `I'm a property edited with tiptap`, 'x-display': 'custom-tiptap' }
  }
}

const model = {}

const template = `<v-jsf v-model="model" :schema="schema" :options="options">
  <template slot="custom-tiptap" slot-scope="context">
    <v-jsf-tiptap v-bind="context" />
  </template>
</v-jsf>`

const options = {}

export default { id, title, description, schema, model, template, options, skip: true }
