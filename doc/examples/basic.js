exports.id = 'basic'

exports.title = 'Basic types'

exports.description = `All basic types are supported : string, number, integer, boolean`

exports.schema = {
  type: 'object',
  required: ['stringProp'],
  properties: {
    stringProp: { type: 'string', title: `I'm a string` },
    numberProp: { type: 'number', title: `I'm a number` },
    integerProp: { type: 'integer', title: `I'm an integer` },
    booleanProp: { type: 'boolean', title: `I'm a boolean` }
  }
}

exports.model = {
  firstName: 'Alban',
  lastName: 'Mouton'
}

exports.options = {}
