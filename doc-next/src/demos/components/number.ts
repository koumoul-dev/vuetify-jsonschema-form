import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-number',
  route: '/components/number',
  demos: [
    {
      id: 'number-vs-integer',
      title: 'type: number vs type: integer',
      schema: {
        type: 'object',
        properties: {
          weight: { type: 'number', title: 'Weight (number)', description: 'Accepts decimals, e.g. 2.5' },
          quantity: { type: 'integer', title: 'Quantity (integer)', description: 'Only whole numbers are valid' },
        },
      },
    },
    {
      id: 'validation',
      title: 'minimum, maximum & multipleOf',
      schema: {
        type: 'number',
        title: 'Between 0 and 100, multiple of 5',
        minimum: 0,
        maximum: 100,
        multipleOf: 5,
      },
      data: 42,
      options: { initialValidation: 'always' },
    },
    {
      id: 'slider',
      title: 'layout: slider',
      schema: { type: 'number', title: 'Volume', layout: 'slider', minimum: 0, maximum: 10 },
    },
  ],
}
export default collection
