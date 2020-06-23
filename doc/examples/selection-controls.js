const id = 'selection-controls'

const title = 'Selection controls'

const description = `It is possible to replace selects by radio, checkbox and switch groups using the \`x-display\` annotation with values \`radio\`, \`checkbox\` and \`switch\`.`

const schema = {
  type: 'object',
  properties: {
    stringEnum: {
      type: 'string',
      title: `I'm a string with values from an enum and x-display=radio`,
      description: 'This description is used as a help message.',
      enum: ['value 1', 'value 2'],
      'x-display': 'radio'
    },
    stringsArrayEnum: {
      type: 'array',
      title: `I'm an array of strings with values from an enum and x-display=checkbox`,
      description: 'This description is used as a help message.',
      items: { type: 'string', enum: ['value 1', 'value 2'] },
      minItems: 1,
      'x-display': 'checkbox'
    },
    stringArrayOneOf: {
      type: 'array',
      title: `I'm an array of strings with values/labels from a oneOf and x-display=switch`,
      items: { type: 'string', oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }] },
      'x-display': 'switch'
    }
  },
  required: ['stringEnum']
}

const model = {
  stringsArrayEnum: ['value 1']
}

export default { id, title, description, schema, model }
