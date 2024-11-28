/** @type {import("@json-layout/examples").JSONLayoutExample} */
const example = {
  title: 'Code slots',
  id: 'code',
  description: 'The `component` slot should provide the name of a slot given to Vjsf using the Vue.js slot mechanism.',
  schema: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        title: 'A text string',
        layout: {
          slots: {
            component: 'custom-textarea'
          }
        }
      }
    }
  },
  codeSlots: ['custom-textarea']
}

export default example
