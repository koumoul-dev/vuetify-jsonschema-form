const randomWords = require('random-words')

const id = 'select'

const title = 'Selects'

const description = `Enums and oneOfs with const values are represented as select fields.

Arrays are represented as multi-value select fields.

If the number of item is too large the select is replaced by a auto-complete`

const schema = {
  type: 'object',
  properties: {
    stringEnum: {
      type: 'string',
      title: `I'm a string with values from an enum`,
      enum: ['value 1', 'value 2'],
      description: 'This description is used as a help message.'
    },
    stringsArrayEnum: {
      type: 'array',
      title: `I'm an array of strings with values from an enum`,
      items: { type: 'string', enum: ['value 1', 'value 2'] }
    },
    stringOneOf: {
      type: 'string',
      title: `I'm a string with values/labels from a oneOf`,
      oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }]
    },
    stringArrayOneOf: {
      type: 'array',
      title: `I'm an array of strings with values/labels from a oneOf`,
      items: { type: 'string', oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }] }
    },
    stringEnumLarge: {
      type: 'string',
      title: `I'm a string with values from a large enum`,
      enum: randomWords({ exactly: 25, wordsPerString: 2 }),
      description: 'This description is used as a help message.',
      'x-display': 'autocomplete'
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
