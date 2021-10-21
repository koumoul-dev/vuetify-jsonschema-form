const id = '_separator'

const title = 'Multiple values in a single string'

const description = `Use the x-separator or separator keyword.`

const schema = {
  type: 'object',
  properties: {
    sepString: {
      type: 'string',
      separator: ','
    }
  }
}

const model = {
  sepString: 'test1,test2'
}

/* const test = async (wrapper, modelWrapper, events) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(1)

  await wrapper.vm.$nextTick()
  expect(modelWrapper.model.enumConst).toBe('value')
} */

export default { id, title, description, schema, model }
