import type { DemoCollection } from '../types'

// Demo for the "Getting started" page: the same small schema shown in the
// runtime-compile code sample, so readers see code and result match.
const collection: DemoCollection = {
  id: 'demo-getting-started',
  route: '/introduction/getting-started',
  demos: [{
    id: 'first-form',
    title: 'Your first form',
    schema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', title: 'Title' },
        description: { type: 'string', title: 'Description', layout: 'textarea' },
        dueDate: { type: 'string', title: 'Due date', format: 'date' },
      },
    },
  }],
}
export default collection
