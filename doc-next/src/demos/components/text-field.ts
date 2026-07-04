import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-text-field',
  route: '/components/text-field',
  demos: [
    {
      id: 'default-string',
      title: 'type: string (default)',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name' },
        },
      },
    },
    {
      id: 'textarea',
      title: 'layout: textarea',
      schema: {
        type: 'object',
        properties: {
          bio: { type: 'string', title: 'Bio', layout: 'textarea' },
        },
      },
    },
    {
      id: 'password',
      title: 'A password input',
      schema: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            title: 'Password',
            layout: { comp: 'text-field', props: { type: 'password' } },
          },
        },
      },
    },
    {
      id: 'annotations',
      title: 'title, description, examples & default',
      schema: {
        type: 'object',
        properties: {
          nickname: {
            type: 'string',
            title: 'Nickname',
            description: 'How your name is shown to others',
            examples: ['Ada', 'Alan'],
            default: 'Anonymous',
          },
        },
      },
    },
  ],
}
export default collection
