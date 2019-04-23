module.exports = {
  title: 'Accordion',
  schema: {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Combinations',
    description: 'using a root allOf as an accordion',
    'type': 'object',
    allOf: [{ $ref: '#/definitions/realWorldEntity' }, { $ref: '#/definitions/socialMediaEntity' }],
    definitions: {
      realWorldEntity: {
        title: 'Main infos',
        properties: {
          address: {
            type: 'string',
            maxLength: 2000
          },
          'credit_card': { 'type': 'number' }
        },
        'dependencies': {
          'credit_card': {
            'properties': {
              'billing_address': { 'type': 'string' }
            },
            'required': ['billing_address']
          }
        }
      },
      socialMediaEntity: {
        title: 'Social media',
        properties: {
          twitter: {
            type: 'string'
          },
          facebook: {
            type: 'string'
          }
        }
      }
    }
  },
  data: {
    presentation: 'lorem ipsum',
    twitter: 'koumoul_fr',
    type: 'physicalPerson',
    firstName: 'Alban',
    lastName: 'Mouton'
  }
}
