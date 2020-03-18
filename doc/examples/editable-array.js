const id = 'editable-array'

const title = 'Editable array'

const description = `Arrays of objects are presented as an editable list of cards.

Each item is validated separately and does not impact global form validity. Saving an item is blocked if it is not valid.

The list is sortable by dragging the card elements.`

const schema = {
  type: 'object',
  properties: {
    objectArrayProp: {
      type: 'array',
      title: `I'm an array of objects`,
      description: 'This description is used as a help message.',
      'x-itemTitle': 'titleProp',
      items: {
        type: 'object',
        required: ['titleProp'],
        properties: {
          titleProp: { type: 'string', title: `I'm a required string used as title` },
          numberProp: { type: 'number', title: `I'm a number` },
          booleanProp: { type: 'boolean', title: `I'm a boolean` }
        }
      }
    }
  }
}

const model = {}

const options = {
  hideReadOnly: true
}

export default { id, title, description, schema, model, options }
