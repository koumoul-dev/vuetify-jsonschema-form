import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-dynamic-data',
  route: '/behavior/dynamic-data',
  demos: [
    {
      id: 'get-items-expression',
      title: 'getItems as an expression',
      schema: {
        type: 'object',
        properties: {
          fruit: {
            type: 'string',
            title: 'Favorite fruit',
            layout: { getItems: 'context.fruits' },
          },
        },
      },
      options: {
        context: { fruits: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'] },
      },
    },
    {
      id: 'transform-items',
      title: 'Transforming items (itemsResults / itemTitle / itemValue)',
      schema: {
        type: 'object',
        properties: {
          person: {
            type: 'string',
            title: 'Pick a person',
            layout: {
              getItems: {
                expr: 'context.people',
                itemsResults: 'data.results',
                itemTitle: 'item.label',
                itemValue: 'item.id',
                itemIcon: '"mdi-" + item.icon',
              },
            },
          },
        },
      },
      options: {
        context: {
          people: {
            results: [
              { id: 'ada', label: 'Ada Lovelace', icon: 'account' },
              { id: 'alan', label: 'Alan Turing', icon: 'account' },
              { id: 'grace', label: 'Grace Hopper', icon: 'account' },
            ],
          },
        },
      },
    },
  ],
}
export default collection
