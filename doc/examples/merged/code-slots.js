/** @type {import("@json-layout/examples").JSONLayoutExample} */
const example = {
  title: 'Code slots',
  id: 'code',
  description: 'TODO',
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
