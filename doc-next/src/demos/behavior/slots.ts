import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-slots',
  route: '/behavior/slots',
  demos: [
    {
      id: 'positioning',
      title: 'before / after positioning slots',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            layout: {
              slots: {
                before: 'Some **markdown** hint before the field.',
                after: { text: 'A plain text note after the field.' },
              },
            },
          },
        },
      },
    },
  ],
}
export default collection
