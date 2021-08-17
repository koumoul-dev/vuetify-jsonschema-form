const id = '_wrong-enum-value'

const title = 'Array inside a anyof with a value outside enum'

const description = `This can create an infinite loop.`

const options = {}

const schema = {
  type: 'object',
  properties: {
    array1: {
      type: 'array',
      items: {
        type: 'object',
        anyOf: [{
          properties: {
            key: { type: 'string', const: 'key' },
            string1: {
              type: 'string',
              enum: ['ok1', 'ok2']
            }
          }
        }]
      }
    }
  }
}

const model = { array1: [{ key: 'key', string1: 'ok1' }, { key: 'key', string1: 'ko' }] }

export default { id, title, description, schema, model, options }
