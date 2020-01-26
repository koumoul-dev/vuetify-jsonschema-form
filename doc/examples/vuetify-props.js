const id = 'vuetify-props'

const title = 'Vuetify props'

const description = `The x-props annotation can be used to add properties to underlying Vuetify components.

This functionality is tightly coupled to Vuetify for simplicity and power.`

const schema = {
  type: 'object',
  properties: {
    chipsEnumProp: { type: 'array', description: `I'm an array of strings from an enum with a bunch of additional props`, 'x-props': { chips: true, deletableChips: true, soloInverted: true, prependIcon: 'mdi-heart' }, items: { type: 'string', enum: ['value 1', 'value 2'] } }
  }
}

const model = {
  chipsEnumProp: ['value 1']
}

const options = {}

export default { id, title, description, schema, model, options }
