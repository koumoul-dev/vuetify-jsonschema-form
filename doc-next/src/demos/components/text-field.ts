import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-text-field',
  route: '/components/text-field',
  demos: [
    {
      id: 'default-string',
      title: 'type: string (default)',
      schema: { type: 'string', title: 'Name' },
    },
    {
      id: 'textarea',
      title: 'layout: textarea',
      schema: { type: 'string', title: 'Bio', layout: 'textarea' },
    },
    {
      id: 'password',
      title: 'A password input',
      schema: {
        type: 'string',
        title: 'Password',
        layout: { props: { type: 'password' } },
      },
      // defaultOn: 'missing' keeps a cleared field emitting "" instead of
      // dropping the value (which surfaces as null on a root string)
      options: { defaultOn: 'missing' },
    },
    {
      id: 'annotations',
      title: 'title, description & default',
      // wrapped in an object: on a root-level primitive the initial null
      // model is not considered "empty" so the default would not be applied
      // (see BUGS.md) — a missing object property is, matching real forms
      schema: {
        type: 'object',
        properties: {
          nickname: {
            type: 'string',
            title: 'Nickname',
            description: 'How your name is shown to others',
            default: 'Anonymous',
          },
        },
      },
    },
    {
      id: 'examples',
      title: 'examples as suggestions',
      schema: {
        type: 'string',
        title: 'Nickname',
        examples: ['Ada', 'Alan'],
      },
    },
  ],
}
export default collection
