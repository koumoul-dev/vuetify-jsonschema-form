const id = 'example-values'

const title = 'Example values'

const description = `The \`example\` keyword from JSON schema is used to suggest values in a "string", "number", "integer" or "array" but is not required as the "enum" keyword.`

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: 'string', title: `I'm a string with some examples`, default: `I'm a default value`, examples: [`I'm a suggested value`, `Hey!!! I'm another suggestion`] },
    numberProp: { type: 'number', title: `I'm a number with some examples`, default: 1, examples: [11, 22, 33, 44, 55] },
    stringArrayProp: { type: 'array', title: `I'm an array of strings with some examples`, items: { type: 'string' }, examples: [`I'm a suggested value`, `Hey!!! I'm another suggestion`] },
    numberArrayProp: { type: 'array', title: `I'm an array of numbers with some examples`, items: { type: 'number' }, examples: [1, 2, 3, 4, 5] }
  }
}

const model = {}

export default { id, title, description, schema, model }
