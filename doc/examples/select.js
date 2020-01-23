const id = 'select'

const title = 'Selects'

const description = `Enums and and oneOfs with const values are represented as select fields. Arrays of the same things are represented as multi-value select fields.`

const schema = {
  type: 'object',
  properties: {
    stringEnum: { type: 'string', title: `I'm a string with values from an enum`, enum: ['value 1', 'value 2'], description: 'This description is used as a help message.' },
    stringsArrayEnum: { type: 'array', title: `I'm an array of strings with values from an enum`, items: { type: 'string', enum: ['value 1', 'value 2'] } }
  }
}

const model = {}

const options = {}

export default { id, title, description, schema, model, options }
