const id = 'editable-array'

const title = 'Editable array'

const description = `Arrays of objects are presented as an editable list of cards.

The list can optionaly be sortable also.`

const schema = {
  type: 'object',
  properties: {
    objectArrayProp: {
      type: 'array',
      title: `I'm an array of objects`,
      description: 'This description is used as a help message.',
      items: {
        type: 'object',
        properties: {
          stringProp: { type: 'string', title: `I'm a string` },
          numberProp: { type: 'number', title: `I'm a number` },
          integerProp: { type: 'integer', title: `I'm an integer` },
          booleanProp: { type: 'boolean', title: `I'm a boolean` },
          stringArrayProp: { type: 'array', title: `I'm an array of strings`, items: { type: 'string' } }
        }
      }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
