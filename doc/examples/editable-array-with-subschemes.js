const id = 'editableArrayWithSubschemes'

const title = 'Editable array with subschemes'

const description = `Arrays of different objects having different schemes are presented as an editable list of cards.

Each item is validated separately and does not impact global form validity. Saving an item is blocked if it is not valid.

The list is sortable by dragging the card elements.`

const schema = {
  type: 'object',
  title: 'Objects',
  properties: {
    objectArrayDiffProps: {
      type: 'array',
      title: `Add an object of type Object1 or Object2`,
      'x-itemTitle': 'titleProp',
      items: {
        type: 'object',
        title: 'Object type',
        oneOf: [
          {
            title: 'Object1',
            required: ['titleProp'],
            properties: {
              objectType: { type: 'string', const: 'Object1_type' },
              titleProp: { type: 'string', title: `Name` },
              numberProp: { type: 'number', title: `I'm a number` },
              booleanProp: { type: 'boolean', title: `I'm a boolean` },
              dateProp: { type: 'string', format: 'date', title: `I'm a date` }
            }
          },
          {
            title: 'Object2',
            required: ['titleProp'],
            properties: {
              objectType: { type: 'string', const: 'Object2_type' },
              titleProp: { type: 'string', title: `Name` },
              numberProp: { type: 'number', title: `I have only one number prop` }
            }
          }
        ]
      }
    }
  }
}

const model = {}

const options = {
  hideReadOnly: true
}

export default { id, title, description, schema, model, options }
