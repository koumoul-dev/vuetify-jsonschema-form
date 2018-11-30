module.exports = {
  title: 'Dependencies',
  schema: {
    'type': 'object',
    'properties': {
      'name': { 'type': 'string' },
      'credit_card': { 'type': 'number' }
    },
    'required': ['name'],
    'dependencies': {
      'credit_card': {
        'properties': {
          'billing_address': { 'type': 'string' }
        },
        'required': ['billing_address']
      }
    }
  },
  data: {}
}
