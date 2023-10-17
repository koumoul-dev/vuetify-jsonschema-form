const id = '_calculated-value'

const title = 'Calculate the value of a property'

const description = ``

const schema = {
  type: 'object',
  properties: {
    string1: {
      title: `I'm a string whose value is used to calculate the next property`,
      type: 'string'
    },
    string2: {
      title: `I'm a string whose value is calculated`,
      type: 'string',
      readOnly: true,
      'x-options': { evalMethod: 'evalExpr' },
      'x-constExpr': 'concatString("Hello ", toUpperCase(parent.value.string1), " !")'
    }
  }
}

const model = {
  string1: 'world'
}

export default { id, title, description, schema, model }
