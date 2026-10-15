import type { DemoCollection } from '../types'

const contactItem = {
  type: 'object',
  title: 'Contact',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', title: 'Email' },
  },
}

const contactsData = [
  { name: 'Ada Lovelace', email: 'ada@example.com' },
  { name: 'Alan Turing', email: 'alan@example.com' },
]

const collection: DemoCollection = {
  id: 'demo-lists',
  route: '/components/lists',
  demos: [
    {
      id: 'primitives',
      title: 'Array of primitives (default: inline)',
      schema: {
        type: 'array',
        title: 'Tags',
        layout: { comp: 'list' },
        items: { type: 'string', title: 'Tag' },
      },
      data: ['docs', 'forms'],
    },
    {
      id: 'objects',
      title: 'Array of objects (default: inline-single)',
      schema: {
        type: 'array',
        title: 'Contacts',
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'inline',
      title: 'listEditMode: inline',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listEditMode: 'inline' },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'inline-single',
      title: 'listEditMode: inline-single',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listEditMode: 'inline-single' },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'menu',
      title: 'listEditMode: menu',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listEditMode: 'menu' },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'dialog',
      title: 'listEditMode: dialog',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listEditMode: 'dialog' },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'menu-width',
      title: 'listMenuWidth',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listEditMode: 'menu', options: { listMenuWidth: 700 } },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'dialog-width',
      title: 'listDialogWidth',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listEditMode: 'dialog', options: { listDialogWidth: 800 } },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'tuple',
      title: 'Fixed-length items array (tuple)',
      schema: {
        type: 'array',
        title: 'Coordinates',
        items: [
          { type: 'number', title: 'Latitude' },
          { type: 'number', title: 'Longitude' },
        ],
      },
      data: [48.8566, 2.3522],
    },
    {
      id: 'indexed',
      title: 'Indexed object (patternProperties)',
      schema: {
        type: 'object',
        title: 'Scores (lowercase player name as key)',
        patternProperties: {
          '^[a-z]+$': { type: 'number', title: 'Score' },
        },
      },
      data: { alice: 10, bob: 7 },
    },
  ],
}
export default collection
