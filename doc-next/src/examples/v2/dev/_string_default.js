const id = '_string_default'

const title = 'String default values'

const description = 'The default value of a string should only be used if is string is not defined, but not if it is empty.'

const schema = {
  type: 'object',
  properties: {
    stringEmpty: {
      type: 'string',
      default: 'Default value 1',
    },
    stringUndefined: {
      type: 'string',
      default: 'Default value 2',
    },
  },
}

const model = {
  stringEmpty: '',
}

const options = {}

export default { id, title, description, schema, model, options }
