const id = '_prefilled-select'

const title = 'Prefilled Selects'

const description = 'Selects can have initial values and appear checked, as needed'

const schema = {
  type: 'object',
  properties: {
    arrayOneOf: {
      type: 'array',
      title: 'I\'m an array with values/labels from a oneOf',
      items: {
        type: 'string',
        oneOf: [
          {
            const: 'value1',
            title: 'Value 1'
          },
          {
            const: 'value2',
            title: 'Value 2'
          }
        ]
      }
    }
  }
}

const options = {}

const model = {
  arrayOneOf: ['value1']
}

export default { id, title, description, schema, model, options }
