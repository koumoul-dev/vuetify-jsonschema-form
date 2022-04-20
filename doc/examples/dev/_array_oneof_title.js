const id = 'array-oneof-title'

const title = 'Array item titles from oneOf'

const description = ``

const schema = {
  type: 'object',
  properties: {
    arrayProp: {
      type: 'array',
      'x-itemTitle': 'type',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'integer',
            oneOf: [{
              const: 1,
              title: 'One'
            }, {
              const: 2,
              title: 'Two'
            }]
          },
          stringProp: {
            type: 'string'
          }
        }
      }
    },
    arrayProp2: {
      type: 'array',
      'x-itemTitle': 'type',
      items: {
        type: 'object',
        'x-itemKey': 'type',
        oneOf: [{
          type: 'object',
          title: 'One',
          properties: {
            type: {
              const: 1
            },
            stringProp: {
              type: 'string'
            }
          }
        }, {
          type: 'object',
          title: 'Two',
          properties: {
            type: {
              const: 2
            },
            stringProp2: {
              type: 'string'
            }
          }
        }]
      }
    }
  }
}

const model = {
  arrayProp: [{ type: 1, stringProp: 'hello' }],
  arrayProp2: [{ type: 1, stringProp: 'hello' }]
}

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
