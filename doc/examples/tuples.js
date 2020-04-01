const id = 'tuples'

const title = 'Tuples'

const description = `Arrays can be defined with multiple item schemas instead of just one. In this case the array has a fixed size and each item is rendered as a property.

This pattern is suitable for lat/lon pairs for example.`

const schema = {
  type: 'object',
  properties: {
    tupleProp: {
      type: 'array',
      title: `I'm a tuple of 2 numbers`,
      items: [
        { type: 'number', title: `I'm a number`, default: 0 },
        { type: 'number', title: `I'm another number`, default: 0 }
      ]
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
