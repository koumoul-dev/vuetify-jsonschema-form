const id = 'rich-expression'

const title = 'Rich expression'

const description = `
    x-if take also rich logical expression using [expr-eval](https://www.npmjs.com/package/expr-eval).
    **Note**: to access value in your model you shoud use modelRoot key. 
`

const schema = {
  type: 'object',
  properties: {
    titleProp: { type: 'string', title: `I'm a required string used as title` },
    stringProp: { type: 'string', title: `I'm another required string` },
    conditionnalProp: {
      type: 'string', title: `I'm here if string props === to Hello`, 'x-if': 'modelRoot.stringProp  == \'Hello\' '
    }

  }
}

const model = {
  titleProp: `Object title`,
  stringProp: 'Hello'
}

const options = {
  evalMethod: 'evalExpr',
  editMode: 'inline'
}

const test = (wrapper) => {
  const properties = wrapper.findAll('.vjsf-property')
  expect(properties).toHaveLength(4)
  expect(wrapper.vm.valid).toBe(true)
}

export default { id, title, description, schema, model, options, test }
