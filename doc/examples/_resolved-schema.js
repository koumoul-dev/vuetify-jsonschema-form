const id = '_resolved_schema'

const title = 'resolved schema'

const description = `Test case around schema with $ref elements`

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: 'string', title: `I'm a string`, description: 'This description is used as a help message.' },
    refProp1: { $ref: '#/definitions/prop' }
    // refProp2: { $ref: '#/definitions/missingProp' }
  },
  definitions: {
    prop: { type: 'string', title: `I'm a prop resolved from a $ref` }
  }
}

const model = {}

const test = (wrapper) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(3)
  expect(wrapper.vm.valid).toBe(true)
}

export default { id, title, description, schema, model, test }
