const randomWords = require('random-words')

const id = 'autocomplete'

const title = 'Autocompletes'

const description = `This is the same as normal Select but allows auto-completion of the item titles - and it works even with less than 20 items.`

const schema = {
  type: 'object',
  properties: {
    stringEnum: {
      type: 'string',
      title: `I'm a string with values from an enum`,
      enum: ['first value', 'second value'],
      description: 'This description is used as a help message.',
      'x-display': 'autocomplete',
      'x-props': {
        chips: true,
        deletableChips: true,
        smallChips: true,
        menuProps:
          {
            auto: true,
            offsetY: true,
            closeOnContentClick: true,
          },
        clearable: true,          
      }
    },
    stringsArrayEnum: {
      type: 'array',
      title: `I'm an array of strings with values from an enum`,
      items: { type: 'string', enum: ['first value', 'second value'] },
      'x-display': 'autocomplete',
      'x-props': {
        chips: true,
        deletableChips: true,
        smallChips: true,
        menuProps:
          {
            auto: true,
            offsetY: true,
            closeOnContentClick: true,
          },
        clearable: true,          
      }
    },
    stringOneOf: {
      type: 'string',
      title: `I'm a string with values/labels from a oneOf`,
      oneOf: [{ const: 'value1', title: 'First Value' }, { const: 'value2', title: 'Second Value' }],
      'x-display': 'autocomplete',
      'x-props': {
        chips: true,
        deletableChips: true,
        smallChips: true,
        menuProps:
          {
            auto: true,
            offsetY: true,
            closeOnContentClick: true,
          },
        clearable: true,          
      }
    },
    stringArrayOneOf: {
      type: 'array',
      title: `I'm an array of strings with values/labels from a oneOf`,
      items: { type: 'string', oneOf: [{ const: 'value1', title: 'First Value' }, { const: 'value2', title: 'Second Value' }] },
      'x-display': 'autocomplete',
      'x-props': {
        chips: true,
        deletableChips: true,
        smallChips: true,
        menuProps:
          {
            auto: true,
            offsetY: true,
            closeOnContentClick: true,
          },
        clearable: true,          
      }
    },
    stringEnumLarge: {
      type: 'string',
      title: `I'm a string with values from a large enum`,
      enum: randomWords({ exactly: 25, wordsPerString: 2 }),
      description: 'This description is used as a help message.',
      'x-display': 'autocomplete',
      'x-props': {
        chips: true,
        deletableChips: true,
        smallChips: true,
        menuProps:
          {
            auto: true,
            offsetY: true,
            closeOnContentClick: true,
          },
        clearable: true,          
      }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
