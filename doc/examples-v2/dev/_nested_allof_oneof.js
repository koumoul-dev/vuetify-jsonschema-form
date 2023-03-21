const id = '_nested_allof_oneof'

const title = 'Nested allOfs and oneOfs'

const description = `Bug prone situation.`

const schema = {
  type: 'object',
  title: 'A section with oneOf',
  description: 'Description displayed in a tooltip',
  oneOf: [{
    type: 'object',
    title: `I'm a sub-schema`,
    properties: {
      type: { type: 'string', const: 'subSchema1' },
      stringProp1: { type: 'string', title: `I'm a property in sub-schema 1` }
    }
  }, {
    type: 'object',
    title: `I'm another sub-schema`,
    allOf: [
      {
        title: 'a allOf section in sub-schema',
        properties: { stringProp2: { type: 'string', title: `I'm a property in sub-schema 2` } }
      },
      {
        title: 'another allOf section in sub-schema',
        properties: { stringProp3: { type: 'string', title: `I'm another property in sub-schema 2` } }
      }
    ],
    properties: {
      type: { type: 'string', const: 'subSchema2' }
    }
  }]

}

const model = {}

const test = async (wrapper, modelWrapper, events) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(1)

  // sub-schema is required and missing
  expect(wrapper.vm.valid).toBe(false)
  expect(modelWrapper.model.type).toBeFalsy()

  // select first sub schema
  const select = wrapper.find('.vjsf-property-root .v-input__slot')
  expect(select.exists()).toBe(true)
  select.trigger('click')
  await wrapper.vm.$nextTick()
  let selectOptions = wrapper.findAll('.v-select-list .v-list-item')
  expect(selectOptions).toHaveLength(2)
  selectOptions.at(0).trigger('click')
  await new Promise(resolve => setTimeout(resolve, 10))
  expect(modelWrapper.model.type).toBe('subSchema1')

  // select 2nd sub schema
  select.trigger('click')
  await wrapper.vm.$nextTick()
  selectOptions = wrapper.findAll('.v-select-list .v-list-item')
  expect(selectOptions).toHaveLength(2)
  selectOptions.at(1).trigger('click')
  await new Promise(resolve => setTimeout(resolve, 10))
  expect(modelWrapper.model.type).toBe('subSchema2')
}

export default { id, title, description, schema, model, test }
