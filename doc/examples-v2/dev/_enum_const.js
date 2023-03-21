const id = '_enum_const'

const title = 'Enum with a single item as const'

const description = `Enum with a single item can be used as another way to express const. See issue #212.`

const schema = {
  type: 'object',
  properties: {
    enumConst: {
      type: 'string',
      enum: ['value']
    }
  }
}

const model = {}

const test = async (wrapper, modelWrapper, events) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(1)

  await wrapper.vm.$nextTick()
  expect(modelWrapper.model.enumConst).toBe('value')
}

export default { id, title, description, schema, model, test }
