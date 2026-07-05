import type { DemoCollection } from '../types'

const collection: DemoCollection = {
  id: 'demo-slots',
  route: '/behavior/slots',
  demos: [
    {
      id: 'positioning',
      title: 'before / after positioning slots',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            layout: {
              slots: {
                before: 'Some **markdown** hint before the field.',
                after: { text: 'A plain text note after the field.' },
              },
            },
          },
        },
      },
    },
    {
      id: 'custom-textarea',
      title: 'component slot replacing a field with a custom textarea',
      schema: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            title: 'A text string',
            layout: {
              slots: { component: 'custom-textarea' },
            },
          },
        },
      },
      slotsCode: `<template #custom-textarea="{ node, statefulLayout }">
  <textarea
    :value="node.data"
    placeholder="A custom textarea"
    @input="event => statefulLayout.input(node, event.target.value)"
  />
</template>`,
    },
    {
      id: 'custom-message',
      title: 'named slot with props from the schema',
      schema: {
        type: 'object',
        properties: {
          text: { type: 'string', title: 'A text string' },
        },
        layout: [
          { key: 'text' },
          { name: 'custom-message', props: { prop1: 'A prop given to the code slot' } },
        ],
      },
      slotsCode: `<template #custom-message="{ node, prop1 }">
  This message is defined in a slot
  (key={{ node.key }}, data={{ node.data }}, additional prop={{ prop1 }})
</template>`,
    },
  ],
}
export default collection
