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
              // own value; reaching a sibling goes through `parent.data`
              // (auto-detected as impure, no `pure: false` needed).
              if: 'parent.data?.needsInvoice',
            },
          },
        },
      },
    },
  ],
}
export default collection
