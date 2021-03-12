const id = '_wrong-types'

const title = 'Ignore values with wrong type'

const description = `Can happen both in case of invalid original data and incompatible schemas in a select.`

const schema = {
  type: 'object',
  properties: {
    string1: {
      title: `I'm a string with object as original data`,
      type: 'string'
    },
    string2: {
      title: `I'm a string with string as original data`,
      type: 'string'
    }
  },
  oneOf: [{
    properties: {
      type: {
        type: 'string',
        const: 'contentIsString1'
      },
      content: {
        type: 'string'
      }
    }
  }, {
    properties: {
      type: {
        type: 'string',
        const: 'contentIsString2'
      },
      content: {
        type: 'string'
      }
    }
  }, {
    properties: {
      type: {
        type: 'string',
        const: 'contentIsNumber'
      },
      content: {
        type: 'number'
      }
    }
  }, {
    properties: {
      type: {
        type: 'string',
        const: 'contentIsObject'
      },
      content: {
        type: 'object',
        properties: {
          child: { type: 'string' }
        }
      }
    }
  }]
}

const model = {
  string1: { test: 'test' },
  string2: 'test'
}

export default { id, title, description, schema, model }
