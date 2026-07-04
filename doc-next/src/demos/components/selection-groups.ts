import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-selection-groups',
  route: '/components/selection-groups',
  demos: [
    {
      id: 'radio-group',
      title: 'layout: radio-group',
      schema: {
        type: 'object',
        properties: {
          plan: {
            type: 'string',
            title: 'Plan',
            enum: ['free', 'pro', 'enterprise'],
            layout: 'radio-group',
          },
        },
      },
    },
    {
      id: 'checkbox-group',
      title: 'layout: checkbox-group',
      schema: {
        type: 'object',
        properties: {
          toppings: {
            type: 'array',
            title: 'Toppings',
            items: { type: 'string', enum: ['cheese', 'mushroom', 'olives'] },
            layout: 'checkbox-group',
          },
        },
      },
    },
    {
      id: 'switch-group',
      title: 'layout: switch-group',
      schema: {
        type: 'object',
        properties: {
          features: {
            type: 'array',
            title: 'Features',
            items: { type: 'string', enum: ['darkMode', 'notifications', 'autoSave'] },
            layout: 'switch-group',
          },
        },
      },
    },
  ],
}
export default collection
