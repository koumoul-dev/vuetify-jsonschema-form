const id = '_x-if'

const title = 'Conditional content (expression)'

const description = `The JSON schema if/then/else syntax can be cumbersome and dependencies too limited. This is why vjsf accepts the \`x-if\` annotation that can contain en evaluated expression. See the [Expressions documentation](configuration#expressions).

**WARNING:** this syntax is entirely ignored by a JSON schema validator, therefore you can create a situation where the form is valid but the model is actually invalid (for example if you use \`x-if\` on a property that is also required).`

const schema = {
  type: 'object',
  properties: {
    activeProp: {
      type: 'string',
      title: 'I\'m a property rendered if the context contains a truthy value',
      'x-if': 'context.showActive'
    },
    inactiveProp: { type: 'string', 'x-if': 'context.showInactive' }
  },
  oneOf: [{
    'x-if': 'context.showActive',
    title: 'Active choice 1',
    properties: {
      type: { type: 'string', const: 'activeChoice1', title: 'I\'m a choice limited by expressions in a oneOf' }
    }
  }, {
    'x-if': 'context.showActive',
    title: 'Active choice 2',
    properties: {
      type: { type: 'string', const: 'activeChoice2' }
    }
  }, {
    'x-if': 'context.showInactive',
    title: 'Inactive choice',
    properties: {
      type: { type: 'string', const: 'inactiveChoice' }
    }
  }]
}

const model = {}

const options = {
  context: {
    showActive: true,
    showInactive: false
  }
}

export default { id, title, description, schema, model, options }
