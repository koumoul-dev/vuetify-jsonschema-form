import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-expressions',
  route: '/behavior/expressions',
  demos: [
    {
      id: 'if-visibility',
      title: 'layout.if visibility toggle',
      schema: {
        type: 'object',
        title: 'Registration',
        properties: {
          needsInvoice: { type: 'boolean', title: 'I need an invoice' },
          companyName: {
            type: 'string',
            title: 'Company name',
            layout: {
              // `data` inside a property's own expression is that property's
              // own value; reaching a sibling requires the impure `parent`
              // parameter (see the "Pure and impure expressions" section).
              if: { expr: 'parent.data?.needsInvoice', pure: false },
            },
          },
        },
      },
    },
    {
      id: 'get-default-data',
      title: 'getDefaultData computed field',
      schema: {
        type: 'object',
        title: 'Contact',
        properties: {
          firstName: { type: 'string', title: 'First name' },
          lastName: { type: 'string', title: 'Last name' },
          fullName: {
            type: 'string',
            title: 'Full name',
            description: 'Defaults from first + last name while left empty. Clear it to see it recompute.',
            layout: {
              getDefaultData: {
                expr: '((parent.data?.firstName ?? \'\') + \' \' + (parent.data?.lastName ?? \'\')).trim()',
                pure: false,
              },
            },
          },
        },
      },
    },
  ],
}
export default collection
