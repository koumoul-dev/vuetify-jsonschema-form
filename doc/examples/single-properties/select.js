const randomWords = require('random-words')

const id = 'select'

const title = 'Selects'

const description = `Enums, oneOfs with const values and the \`x-fromData\` annotation can be used to create select fields.

Arrays are represented as multi-value select fields.

If the number of items is too large the select is replaced by a auto-complete.

The \`selectAll\` options can be used to add a "select all" action prepended to the list of items. It is only applied on multi-value select fields (not autocomplete).`

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
    },
    stringContext: {
      type: 'string',
      title: `I'm a string with values from the context`,
      'x-fromData': 'context.items'
    },
    objectContext: {
      type: 'object',
      title: `I'm an object with values from the context`,
      'x-fromData': 'context.objectItems',
      'x-itemKey': 'val',
      'x-itemTitle': 'label'
    }
  }
}

const options = {
  context: {
    items: ['value 1', 'value 2'],
    objectItems: [{ val: 'value1', label: 'Value 1' }, { val: 'value2', label: 'Value 2' }]
  },
  selectAll: true
}

const model = {}

export default { id, title, description, schema, model, options }
