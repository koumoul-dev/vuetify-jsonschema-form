const id = 'nullable'

const title = 'Nullable properties'

const description = `Properties with basic types can support alternative "null" type.

In this case VJsf will set null values when initializing empty properties or when clearing an existing property.`

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: ['string', 'null'], title: `I'm a nullable string` },
    dateProp: { type: ['string', 'null'], title: `I'm a clearable date`, format: 'date' },
    selectProp: { type: ['string', 'null'], title: `I'm a clearable string from an enum`, enum: ['value 1', 'value 2', null] }
  }
}

const model = {}

export default { id, title, description, schema, model }
