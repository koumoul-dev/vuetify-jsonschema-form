/** @type {import("../types.js").VJSFExample} */
const example = {
  title: 'Props and slots',
  id: 'props-slots',
  description: 'It is possible to specify directly some props and slots for some of the Vuetify components that closely match a node in the layout.',
  schema: {
    type: 'object',
    properties: {
      str1: {
        type: 'string',
        title: 'A text field with custom props and slots and using v-defaults-provider tu set variant',
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
  codeSlots: ['custom-message'],
  defaultProps: {
    VTextField: {
      variant: 'outlined'
    }
  }
}

export default example
