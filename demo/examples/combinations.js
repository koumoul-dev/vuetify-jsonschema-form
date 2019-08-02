module.exports = {
  title: 'Combinations',
  schema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Combinations',
    description: 'Using anyOf and allOf combinations. ',
    type: 'object',
    properties: {
      entity: {
        type: 'object',
        properties: {
          presentation: {
            title: 'Presentation (neither in a anyOf or a oneOf)',
            description: 'A longer text for the description.',
            type: 'string',
            maxLength: 2000
          }
        },
        required: ['type'],
        allOf: [{ $ref: '#/definitions/realWorldEntity' }, { $ref: '#/definitions/socialMediaEntity' }],
        oneOf: [{ $ref: '#/definitions/physicalPerson' }, { $ref: '#/definitions/moralPerson' }]
      }
    },
    definitions: {
      realWorldEntity: {
        title: 'Real world (first part of allOf)',
        properties: {
          address: {
            type: 'string',
            maxLength: 2000
          },
          credit_card: { type: 'number' }
        },
        dependencies: {
          credit_card: {
            properties: {
              billing_address: { type: 'string' }
            },
            required: ['billing_address']
          }
        }
      },
      socialMediaEntity: {
        title: 'Social media (second part of allOf)',
        properties: {
          twitter: {
            type: 'string'
          },
          facebook: {
            type: 'string'
          }
        }
      },
      legal: {
        properties: {
          twitter: {
            type: 'string'
          },
          facebook: {
            type: 'string'
          }
        }
      },
      physicalPerson: {
        title: 'Physical person',
        properties: {
          type: {
            type: 'string',
            title: 'Type of person (select based on a oneOf)',
            const: 'physicalPerson'
          }
        },
        allOf: [{
          type: 'object',
          title: 'Name (first part of a allOf inside the oneOf)',
          properties: {
            firstName: {
              type: 'string',
              description: "The person's first name."
            },
            lastName: {
              type: 'string',
              description: "The person's last name."
            }
          }
        }, {
          type: 'object',
          title: 'Other info (second part of allOf inside the oneOf)',
          properties: {
            age: {
              description: 'Age in years which must be equal to or greater than zero.',
              type: 'integer',
              minimum: 0
            },
            gender: {
              type: 'string',
              enum: ['male', 'female', 'other']
            }
          }
        }]
      },
      moralPerson: {
        title: 'Moral person',
        properties: {
          type: {
            type: 'string',
            const: 'moralPerson'
          },
          organizationType: {
            type: 'string',
            enum: ['non-profit', 'for-profit']
          }
        }
      }
    }
  },
  data: {
    entity: {
      presentation: 'lorem ipsum',
      twitter: 'koumoul_fr',
      type: 'moralPerson',
      firstName: 'Alban',
      lastName: 'Mouton'
    }
  }
}
