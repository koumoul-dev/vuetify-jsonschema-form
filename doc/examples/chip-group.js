const randomWords = require('random-words')

const id = 'chip-group'

const title = 'Chip groups'

const description = `This uses the \`v-chip-group\` to combine \`v-chip\` items into a group of toggles - the user won't be able to delete items from the group but only to toggle them on/off, that is - including/excluding.

Unfortunately the \`v-chip-group\` Vuetify component does not support label and prepend/append slots at the moment - so no field title or help tooltip will be rendered.`

const schema = {
  type: 'object',
  properties: {
    stringEnum: {
      type: 'string',
      title: `I'm a string with values from an enum`,
      enum: ['value 1', 'value 2'],
      description: 'This description is used as a help message.',
      'x-display': 'chip-group',
      'x-props':
        {
          activeClass: 'primary',
        },
      'x-options':
        {
          chipItemProps:
            {
              filter: true,
            }
        }
     },
    stringsArrayEnum: {
      type: 'array',
      title: `I'm an array of strings with values from an enum`,
      items: { type: 'string', enum: ['value 1', 'value 2'] },
      'x-display': 'chip-group',
      'x-props':
        {
          activeClass: 'primary',
        },
      'x-options':
        {
          chipItemProps:
            {
              filter: true,
            }
        }
    },
    stringOneOf: {
      type: 'string',
      title: `I'm a string with values/labels from a oneOf`,
      oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }],
      'x-display': 'chip-group',
      'x-props':
        {
          activeClass: 'primary',
        },
      'x-options':
        {
          chipItemProps:
            {
              filter: true,
            }
        }
    },
    stringArrayOneOf: {
      type: 'array',
      title: `I'm an array of strings with values/labels from a oneOf`,
      items: { type: 'string', oneOf: [{ const: 'value1', title: 'Value 1' }, { const: 'value2', title: 'Value 2' }] },
      'x-display': 'chip-group',
      'x-props':
        {
          activeClass: 'primary',
        },
      'x-options':
        {
          chipItemProps:
            {
              filter: true,
            }
        }
    },
    stringEnumLarge: {
      type: 'string',
      title: `I'm a string with values from a large enum`,
      enum: randomWords({ exactly: 25, wordsPerString: 2 }),
      description: 'This description is used as a help message.',
      'x-display': 'chip-group',
      'x-props':
        {
          activeClass: 'primary',
        },
      'x-options':
        {
          chipItemProps:
            {
              filter: true,
            }
        }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
