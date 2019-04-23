module.exports = {
  title: 'Dependencies',
  schema: {
    'type': 'object',
    properties: {
      'name': { 'type': 'string' },
      acceptTC: {
        title: 'Accept terms and conditions',
        type: 'boolean'
      }
    },
    dependencies: {
      acceptTC: {
        oneOf: [{ $ref: '#/definitions/creditCardPayment' }, { $ref: '#/definitions/paypalPayment' }]
      }
    },
    definitions: {
      'creditCardPayment': {
        title: 'Credit card payment',
        'properties': {
          type: { const: 'creditcardpayment' },
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
      'paypalPayment': {
        title: 'Paypal payment',
        'properties': {
          type: { const: 'paypalpayment' },
          'paypal account': { 'type': 'string' }
        },
        'required': ['account']
      }
    }
  },
  data: {
    // acceptTC: true,
    // type: 'creditcardpayment',
    // credit_card: 10
  }
}
