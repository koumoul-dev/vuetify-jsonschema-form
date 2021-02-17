const id = 'x-if'

const title = 'Conditional content based on context'

const description = `Not officially documented yet.`

const schema = {
  type: 'object',
  properties: {
    activeProp: { type: 'string', 'x-if': 'context.showActive' },
    inactiveProp: { type: 'string', 'x-if': 'context.showInactive' }
  },
  oneOf: [{
    'x-if': 'context.showActive',
    title: 'active choice 1',
    properties: {
      type: { type: 'string', const: 'activeChoice1', title: 'Limited choice' },
      prop: { type: 'string' }
    }
  }, {
    'x-if': 'context.showActive',
    title: 'active choice 2',
    properties: {
      type: { type: 'string', const: 'activeChoice2' },
      prop: { type: 'string' }
    }
  }, {
    'x-if': 'context.showInactive',
    title: 'inactive choice 1',
    properties: {
      type: { type: 'string', const: 'inactiveChoice1' },
      prop: { type: 'string' }
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
