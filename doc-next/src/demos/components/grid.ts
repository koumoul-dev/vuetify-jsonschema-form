import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-grid',
  route: '/components/grid',
  demos: [
    {
      id: 'cols-number',
      title: 'layout.cols as a plain number',
      schema: {
        type: 'object',
        properties: {
          str1: { type: 'string', title: '12 cols (default)' },
          str2: { type: 'string', title: '4 cols', layout: { cols: 4 } },
          str3: { type: 'string', title: '8 cols', layout: { cols: 8 } },
        },
      },
    },
    {
      id: 'cols-breakpoint',
      title: 'layout.cols as a per-breakpoint object',
      schema: {
        type: 'object',
        properties: {
          str1: {
            type: 'string',
            title: '12 cols below md, 6 cols from md up',
            layout: { cols: { md: 6 } },
          },
          str2: {
            type: 'string',
            title: '12 cols below md, 6 cols from md up',
            layout: { cols: { md: 6 } },
          },
        },
      },
    },
    {
      id: 'address',
      title: 'A two-column address form',
      schema: {
        type: 'object',
        properties: {
          street: { type: 'string', title: 'Street', layout: { cols: 12 } },
          city: { type: 'string', title: 'City', layout: { cols: { sm: 6 } } },
          zip: { type: 'string', title: 'ZIP code', layout: { cols: { sm: 6 } } },
          country: { type: 'string', title: 'Country', layout: { cols: 12 } },
        },
      },
    },
    {
      id: 'density',
      title: 'density',
      schema: {
        type: 'object',
        properties: {
          firstName: { type: 'string', title: 'First name' },
          lastName: { type: 'string', title: 'Last name' },
          subscribe: { type: 'boolean', title: 'Subscribe to the newsletter' },
        },
      },
      options: { density: 'compact' },
    },
  ],
}
export default collection
