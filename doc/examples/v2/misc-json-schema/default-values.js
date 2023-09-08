const id = 'default-values'

const title = 'Default values'

const description = 'The "default" keyword from JSON schema is used to initialize values when they are undefined in the model.'

const schema = {
  type: 'object',
  properties: {
    stringProp: { type: 'string', title: 'I\'m a string', default: 'I\'m a default value' },
    objectSection: {
      type: 'object',
      title: 'I\'m a section with a default value',
      default: {
        child1: 'child 1 default value',
        child2: 'child 2 default value'
      },
      properties: {
        child1: { type: 'string' },
        child2: { type: 'string' }
      }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
