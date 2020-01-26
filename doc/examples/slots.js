const id = 'slots'

const title = 'Slots'

const description = `Each property has \`before\`, \`after\` and \`default\` slots. This is true for object containers, arrays, simple properties, etc. Before and after are handy mostly to pass paragraphs of texts, titles, etc. Default can be used to entirely rewrite the way the property is rendered.

You can define any slot of the main underlying Vuetify component for each property (append, prepend, etc.).

All slots are passed either as textual content in a \`x-slots\` annotation in the schema (markdown supported) or as code inside the <vjsf /> element with a prefix matching the key of the property in the schema.`

const schema = {
  type: 'object',
  properties: {
    stringProp1: { type: 'string', title: `I'm a property with a Vuetify slots`, 'x-slots': { 'append-outer': 'this is a markdown **slot**' } },
    stringProp2: { type: 'string', title: `I'm a property with a before/after/default slots`, 'x-slots': { after: 'this is a markdown **after slot**' } }
  }
}

const model = {}

const options = {}

const template = `<v-jsf :model="model" :schema="schema" :options="options">
  <template slot="stringProp1-prepend">this is a code slot <v-icon>mdi-heart</v-icon></template>
  <template v-slot:stringProp2-before="slotProps">this is a code slot before 2nd property (fullKey={{slotProps.fullKey}}).</template>
  <template v-slot:stringProp2="{modelWrapper, modelKey}"><p class="mt-4">this is the default slot of the 2nd property <input type="text" v-model="modelWrapper[modelKey]" style="border:1px solid red;">.</p></template>
</v-jsf>`

export default { id, title, description, schema, model, options, template }
