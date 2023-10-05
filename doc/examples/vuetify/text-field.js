/** @type {import("@json-layout/examples").JSONLayoutExample} */
const example = {
  title: 'Text field',
  id: 'text-field',
  description: 'It is possible to specify [VTextField props and slots](https://vuetifyjs.com/en/api/v-text-field/).',
  schema: {
    type: 'object',
    properties: {
      str1: {
        type: 'string',
        title: 'A text field with custom props and slots',
        layout: {
          props: {
            appendIcon: 'mdi-heart'
          },
          slots: {
            details: 'custom-message'
          }
        }
      }
    }
  },
  codeSlots: ['custom-message']
}

export default example
