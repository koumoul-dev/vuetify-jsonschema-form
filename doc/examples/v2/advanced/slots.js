const id = 'slots'

const title = 'Slots'

const description = `Each property has \`before\`, \`after\` and \`default\` slots. This is true for object containers, arrays, simple properties, etc. Before and after are handy mostly to display paragraphs of texts, titles, etc. Default can be used to entirely rewrite the way the property is rendered.

You can define any slot of the main underlying Vuetify component for each property (append, prepend, etc.).

All slots are passed either as textual content in a \`x-slots\` annotation in the schema (markdown supported) or as code inside the \`<vjsf />\` element with a prefix matching the key of the property in the schema.

The markdown parser can be defined using the \`markdown\` option. If you use the default third party dependencies it will be [markdown-it](https://github.com/markdown-it/markdown-it) and it will be initialized with the \`markdownit\` option. For example you can use \`{markdownit: {html: true}}\` to accept HTML tags inside the markdown content.

You can write code slots used for multiple properties by naming the slot with a \`custom-\` prefix and passing this name to the \`x-display\` annotation (see custom-string1 in this example).
`

const schema = {
  type: 'object',
  properties: {
    stringProp1: { type: 'string', title: 'I\'m a property with Vuetify slots', 'x-slots': { 'append-outer': 'this is a markdown **slot**' }, enum: ['value 1', 'value 2'] },
    stringProp2: { type: 'string', title: 'I\'m a property with a before/after/default slots', 'x-slots': { after: 'this is a markdown **after slot** with some html <img width="20" src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png">' } },
    stringProp3: { type: 'string', title: 'I\'m a property with a custom display', 'x-display': 'custom-string1' },
    object1: {
      type: 'object',
      title: 'I am an object containing properties with slots',
      properties: {
        stringProp11: { type: 'string', title: 'I\'m a nested property with slots', 'x-slots': { 'append-outer': 'this is a markdown **slot**' } },
        stringProp12: { type: 'string', title: 'I\'m a nested property with a custom display', 'x-display': 'custom-string1' }
      }
    }
  },
  allOf: [{
    title: 'I am an allOf section containing properties with slots',
    properties: {
      stringProp21: { type: 'string', title: 'I\'m a property in a allOf with a before/after/default slots', 'x-slots': { after: 'this is a markdown **after slot** with some html <img width="20" src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png">' } }
    }
  }]
}

const model = {}

const template = `<vjsf v-model="model" :schema="schema" :options="options">
  <template slot="stringProp1-prepend">
    this is a Vuetify code slot
  </template>
  <template slot="stringProp2-before" slot-scope="slotProps">
    this is a code slot before 2nd property (slot props={{Object.keys(slotProps)}}).
  </template>
  <template slot="stringProp2" slot-scope="{value, on}">
    <p class="mt-4">this is the default slot of the 2nd property <input type="text" :value="value" v-on="on" style="border:1px solid red;">.</p>
  </template>
  <template slot="object1.stringProp11-before" slot-scope="slotProps">
    this is a code slot before nested property
  </template>
  <template slot="allOf-0.stringProp21-before" slot-scope="slotProps">
    this is a code slot before allOf property
  </template>
  <template slot="allOf-0.stringProp21" slot-scope="{value, on}">
    <p class="mt-4">this is the default slot of the 2nd property <input type="text" :value="value" v-on="on" style="border:1px solid red;">.</p>
  </template>
  <template slot="custom-string1" slot-scope="{value, label, on}"><p class="mt-4">
    {{label}} <input type="text" :value="value" v-on="on" style="border:1px solid green;">.</p>
  </template>
</vjsf>`

const options = { markdownit: { html: true } }

export default { id, title, description, schema, model, template, options, skip: true }
