import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-select',
  route: '/components/select',
  demos: [
    {
      id: 'enum',
      title: 'Items from enum',
      schema: { type: 'string', title: 'Size', enum: ['S', 'M', 'L', 'XL'] },
    },
    {
      id: 'one-of',
      title: 'Items from oneOf (const + title)',
      schema: {
        type: 'string',
        title: 'Status',
        oneOf: [
          { const: 'draft', title: 'Draft' },
          { const: 'published', title: 'Published' },
        ],
      },
    },
    {
      id: 'combobox',
      title: 'examples + useExamples (combobox)',
      schema: {
        type: 'string',
        title: 'Tag',
        description: 'Pick a suggestion or type your own',
        examples: ['frontend', 'backend', 'devops'],
      },
    },
    {
      id: 'autocomplete',
      title: 'Autocomplete with getItems',
      schema: {
        type: 'string',
        title: 'Favorite fruit',
        layout: { comp: 'autocomplete', getItems: 'context.fruits' },
      },
      options: { context: { fruits: ['apple', 'banana', 'cherry', 'mango', 'kiwi'] } },
    },
    {
      id: 'multi-select',
      title: 'Multi-select: type array + items.enum',
      schema: {
        type: 'array',
        title: 'Toppings',
        items: { type: 'string', enum: ['cheese', 'mushroom', 'olives'] },
      },
    },
    {
      id: 'return-objects',
      title: 'returnObjects',
      schema: {
        type: 'object',
        title: 'Pick a person',
        layout: {
          getItems: {
            expr: "[{id: 1, label: 'Ada'}, {id: 2, label: 'Alan'}]",
            itemTitle: 'item.label',
            itemKey: 'item.id',
            returnObjects: true,
          },
        },
      },
    },
  ],
}
export default collection
