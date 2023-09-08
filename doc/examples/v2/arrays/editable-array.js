const id = 'editable-array'

const title = 'Editable array'

const description = `Arrays of objects are presented as an editable list of cards.

Each item is validated separately and does not impact global form validity. Saving an item is blocked if it is not valid.

The list is sortable by dragging the card elements.

The most relevant options to customize the rendering of the arrays are \`arrayItemColProps\`, \`arrayItemCardProps\` and \`disableSorting\`.`

const schema = {
  type: 'object',
  properties: {
    objectArrayProp: {
      type: 'array',
      title: 'I\'m an array of objects',
      description: 'This description is used as a help message.',
      'x-itemTitle': 'titleProp',
      items: {
        type: 'object',
        required: ['titleProp'],
        properties: {
          titleProp: { type: 'string', title: 'I\'m a required string used as title' },
          numberProp: { type: 'number', title: 'I\'m a number' },
          booleanProp: { type: 'boolean', title: 'I\'m a boolean' },
          selectProp: { type: 'string', enum: ['Value 1', 'Value 2'], title: 'I\'m a select' }
        },
        oneOf: [
          {
            title: 'Object1',
            properties: {
              objectType: { type: 'string', const: 'object1', title: 'Sub object type' },
              dateProp: { type: 'string', format: 'date', title: 'I\'m a date' }
            }
          },
          {
            title: 'Object2',
            properties: {
              objectType: { type: 'string', const: 'object2' },
              colorProp: { type: 'string', format: 'hexcolor', title: 'I\'m a color' }
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
