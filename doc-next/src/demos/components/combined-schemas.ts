import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-combined-schemas',
  route: '/components/combined-schemas',
  demos: [
    {
      id: 'one-of',
      title: 'oneOf as a subschema selector',
      schema: {
        type: 'object',
        properties: {
          payment: {
            type: 'object',
            title: 'Payment method',
            oneOfLayout: { label: 'Choose a payment method' },
            oneOf: [
              {
                title: 'Credit card',
                required: ['cardNumber'],
                properties: {
                  method: { const: 'card' },
                  cardNumber: { type: 'string', title: 'Card number' },
                },
              },
              {
                title: 'Bank transfer',
                required: ['iban'],
                properties: {
                  method: { const: 'transfer' },
                  iban: { type: 'string', title: 'IBAN' },
                },
              },
            ],
          },
        },
      },
    },
    {
      id: 'all-of',
      title: 'allOf as merged sections',
      schema: {
        type: 'object',
        allOf: [
          {
            title: 'Identity',
            properties: {
              firstName: { type: 'string', title: 'First name' },
              lastName: { type: 'string', title: 'Last name' },
            },
          },
          {
            title: 'Contact',
            properties: {
              email: { type: 'string', title: 'Email', format: 'email' },
            },
          },
        ],
      },
    },
    {
      id: 'if-then-else',
      title: 'if/then/else',
      schema: {
        type: 'object',
        properties: {
          accountType: {
            type: 'string',
            title: 'Account type',
            enum: ['personal', 'business'],
          },
        },
        required: ['accountType'],
        if: { properties: { accountType: { const: 'business' } } },
        then: {
          properties: {
            companyName: { type: 'string', title: 'Company name' },
          },
          required: ['companyName'],
        },
        else: {
          properties: {
            firstName: { type: 'string', title: 'First name' },
          },
        },
      },
    },
    {
      id: 'layout-if',
      title: 'layout.if',
      schema: {
        type: 'object',
        properties: {
          country: {
            type: 'string',
            title: 'Country',
            enum: ['France', 'Other'],
          },
          vatNumber: {
            type: 'string',
            title: 'VAT number',
            layout: { if: { expr: 'parent.data?.country === "France"', pure: false } },
          },
        },
      },
    },
  ],
}
export default collection
