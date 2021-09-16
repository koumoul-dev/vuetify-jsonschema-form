const id = 'select-context-deps'

const title = 'Selects with context dependencies'

const description = `It is possible to create a select based on values that depend both on other parts of the model and on the context.`

const schema = {
  type: 'object',
  properties: {
    selectCategory: {
      type: 'string',
      title: `I'm a string from a select that is used to suggest values in the next select`,
      enum: ['cat1', 'cat2']
    }
  },
  dependencies: {
    selectCategory: {
      properties: {
        selectFromContext: {
          type: 'string',
          title: `I'm a string from a select whose values come from the context and depend on the previous select`,
          'x-fromData': 'context.categoryValues[modelRoot.selectCategory]'
        }
      }
    }
  }
}

const model = {}

const options = {
  evalMethod: 'newFunction',
  context: {
    categoryValues: {
      cat1: ['c1-v1', 'c1-v2'],
      cat2: ['c2-v1', 'c2-v2']
    }
  }
}

export default { id, title, description, schema, model, options }
