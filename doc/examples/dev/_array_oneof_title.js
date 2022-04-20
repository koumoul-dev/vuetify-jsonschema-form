const id = 'array-oneof-title'

const title = 'Array item titles from oneOf'

const description = ``

const schema = {
  type: 'object',
  properties: {
    arrayProp: {
      type: 'array',
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
    }
  }
}

const model = {
  arrayProp: [{ type: 1 }]
}

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
