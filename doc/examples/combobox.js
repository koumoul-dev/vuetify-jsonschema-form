const id = 'combobox'

const title = 'ComboBoxes'

const description = `This is the same as normal Select but allows auto-completion of the item titles (like Autocompletes) plus the ability to create new items by the user - and it works even with less than 20 items.

IMPORTANT: You can use this element type with "oneOf" - but if used with "enum" the JSON schema validation will fail as soon as new item (not part of the enum) is created.

Also, new items will have only Title but not Key - and so the Title will be used as Key.`

const schema = {
  type: 'object',
  properties: {
    stringOneOf: {
      type: 'string',
      title: `I'm a string with values/labels from a oneOf`,
      oneOf: [{ const: 'value1', title: 'First Value' }, { const: 'value2', title: 'Second Value' }],
      'x-display': 'combobox',
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
      'x-display': 'combobox',
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
  }
}

const model = {}

export default { id, title, description, schema, model }
