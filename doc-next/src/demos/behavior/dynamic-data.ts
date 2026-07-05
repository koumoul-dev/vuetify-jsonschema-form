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
              // `parent.data` is auto-detected as impure, no `pure: false` needed
              getDefaultData: '((parent.data?.firstName ?? \'\') + \' \' + (parent.data?.lastName ?? \'\')).trim()',
            },
          },
        },
      },
    },
  ],
}
export default collection
