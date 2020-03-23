const id = 'basic'

const title = 'Basic types'

const description = `All basic types are supported : string, number, integer, boolean`

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: 'string', title: `I'm a string`, description: 'This description is used as a help message.' },
    numberProp: { type: 'number', title: `I'm a number` },
    integerProp: { type: 'integer', title: `I'm an integer` },
    booleanProp: { type: 'boolean', title: `I'm a boolean` },
    stringArrayProp: { type: 'array', title: `I'm an array of strings`, items: { type: 'string' } }
  }
}

const model = {
  stringProp: 'initial value',
  numberProp: 10.1,
  integerProp: 10,
  booleanProp: true,
  stringArrayProp: ['item 1', 'item 2']
}

const test = (wrapper) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(6)
  expect(wrapper.findAll('.v-tooltip')).toHaveLength(1)
  expect(properties.at(1).contains('.v-text-field')).toBeTruthy()
  expect(wrapper.vm.valid).toBe(true)
}

export default { id, title, description, schema, model, test }
