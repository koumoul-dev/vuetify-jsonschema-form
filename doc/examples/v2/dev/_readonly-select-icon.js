const id = '_readonly-select-icon'

const title = 'Readonly select with icons'

const description = 'Check rendering of readOnly select.'

const schema = {
  type: 'object',
  properties: {
    iconOneOf: {
      'title': 'I\'m a select with icon codes and titles in a oneOf',
      'type': 'string',
      'x-display': 'icon',
      'x-itemIcon': 'icon',
      'readOnly': true,
      'oneOf': [
        { const: 'alarm', title: 'Alarm', icon: 'mdi-alarm' },
        { const: 'alarm-plus', title: 'Alarm plus', icon: 'mdi-alarm-plus' },
      ],
    },
  },
}

const model = {
  iconOneOf: 'alarm',
}

export default { id, title, description, schema, model }
