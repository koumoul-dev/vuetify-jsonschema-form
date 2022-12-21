const id = '_link-descriptions'

const title = 'Descriptions can be direct links'

const description = `Using the option "linkTooltipsIfAvailable" toolstips will be rendered as links opening in new tab if they are link-only.
If not, they will be rendered as normal.`

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: 'string', title: `I have a normal help message`, description: 'This is a normal help message.' },
    booleanProp: { type: 'boolean', title: `I have a link only help message`, description: 'https://www.example.org' }
  }
}

const model = {
  stringProp: 'initial value',
  booleanProp: true
}

const test = (wrapper) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(3)
  expect(wrapper.findAll('.v-tooltip')).toHaveLength(1)
  expect(wrapper.findAll('.v-btn')).toHaveLength(2)
  expect(properties.at(1).find('.v-text-field')).toBeTruthy()
  expect(wrapper.vm.valid).toBe(true)
}

const options = {
  linkTooltipsIfAvailable: true
}

export default { id, title, description, schema, model, test, options }
