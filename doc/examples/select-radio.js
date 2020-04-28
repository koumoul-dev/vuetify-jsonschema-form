const id = 'select-radio'

const title = 'Selects as radio/checkbox'

const description = `Enums and oneOfs with const values are represented as radio group.

Arrays are represented as checkbox fields.`

const schema = {
  type: 'object',
  properties: {
    stringEnum: {
      type: 'string',
      title: `I'm a string with values from an enum`,
      enum: ['value 1', 'value 2'],
      description: 'This description is used as a help message.',
      'x-display': 'radio'
    },
    stringsArrayEnum: {
      type: 'array',
      title: `I'm an array of strings with values from an enum`,
      items: { type: 'string', enum: ['value 1', 'value 2'] },
      'x-display': 'checkbox'
    },
    stringOneOf: {
      type: 'string',
      title: `I'm a string with values/labels from a oneOf`,
      oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }],
      'x-display': 'radio'
    },
    stringArrayOneOf: {
      type: 'array',
      title: `I'm an array of strings with values/labels from a oneOf`,
      items: { type: 'string', oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }] },
      'x-display': 'checkbox'
    }
  },
  required: ['stringEnum']
}

const model = {}

export default { id, title, description, schema, model }
