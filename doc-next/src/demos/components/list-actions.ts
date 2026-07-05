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
  { name: 'Grace Hopper', email: 'grace@example.com' },
]

const collection: DemoCollection = {
  id: 'demo-list-actions',
  route: '/components/list-actions',
  demos: [
    {
      id: 'defaults',
      title: 'Default actions (no listActions set)',
      schema: {
        type: 'array',
        title: 'Contacts',
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'sort',
      title: 'sort',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listActions: ['add', 'delete', 'sort'] },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'duplicate',
      title: 'duplicate + itemCopy',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: {
          listActions: ['add', 'edit', 'delete', 'duplicate'],
          itemCopy: "{...item, name: item.name + ' (copy)'}",
        },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'insert-after',
      title: 'insertAfter',
      schema: {
        type: 'array',
        title: 'Contacts',
        layout: { listActions: ['add', 'edit', 'delete', 'insertAfter'] },
        items: contactItem,
      },
      data: contactsData,
    },
    {
      id: 'copy-paste',
      title: 'copy / paste across lists (shared clipboardKey)',
      schema: {
        type: 'object',
        properties: {
          teamA: {
            type: 'array',
            title: 'Team A',
            layout: { listActions: ['add', 'edit', 'delete', 'copy', 'paste'], clipboardKey: 'contact' },
            items: contactItem,
          },
          teamB: {
            type: 'array',
            title: 'Team B',
            layout: { listActions: ['add', 'edit', 'delete', 'copy', 'paste'], clipboardKey: 'contact' },
            items: contactItem,
          },
        },
      },
      data: { teamA: [{ name: 'Ada Lovelace', email: 'ada@example.com' }], teamB: [] },
    },
    {
      id: 'confirm-delete-false',
      title: 'confirmDeleteItem: false',
      schema: {
        type: 'array',
        title: 'Contacts',
        items: contactItem,
      },
      data: contactsData,
      options: { confirmDeleteItem: false },
    },
  ],
}
export default collection
