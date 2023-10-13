const id = 'basic'

const title = 'Basic types'

const warning = 'Arrays of strings and numbers are not yet represented as comboboxes.'

const description = 'All basic types are supported : string, number, integer, boolean.'

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: 'string', title: 'I\'m a string', description: 'This description is used as a help message.' },
    stringTextareaProp: { type: 'string', title: 'I\'m a string in a textarea', 'x-display': 'textarea' },
    numberProp: { type: 'number', title: 'I\'m a number' },
    integerProp: { type: 'integer', title: 'I\'m an integer' },
    integerSliderProp: { type: 'integer', title: 'I\'m an integer in a slider', 'x-display': 'slider', minimum: 0, maximum: 5 },
    booleanProp: { type: 'boolean', title: 'I\'m a boolean', description: 'This description is used as a help message.' },
    booleanSwitchProp: { type: 'boolean', title: 'I\'m a boolean with switch display', 'x-display': 'switch', description: 'This description is used as a help message.' },
    stringArrayProp: { type: 'array', title: 'I\'m an array of strings', items: { type: 'string' } },
    integerArrayProp: { type: 'array', title: 'I\'m an array of integers', items: { type: 'integer' } }
  }
}

const model = {
  stringProp: 'initial value',
  numberProp: 10.1,
  integerProp: 10,
  booleanProp: true,
  stringArrayProp: ['item 1', 'item 2']
}

/* const test = (wrapper) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(10)
  expect(wrapper.findAll('.v-tooltip')).toHaveLength(3)
  expect(properties.at(1).find('.v-text-field')).toBeTruthy()
  expect(wrapper.vm.valid).toBe(true)
} */

export default { id, title, warning, description, schema, model }
