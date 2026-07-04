import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-boolean',
  route: '/components/boolean',
  demos: [
    {
      id: 'checkbox',
      title: 'type: boolean (default)',
      schema: {
        type: 'object',
        properties: {
          subscribe: { type: 'boolean', title: 'Subscribe to the newsletter' },
        },
      },
    },
    {
      id: 'switch',
      title: 'layout: switch',
      schema: {
        type: 'object',
        properties: {
          darkMode: { type: 'boolean', title: 'Dark mode', layout: 'switch' },
        },
      },
    },
  ],
}
export default collection
