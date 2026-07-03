/** @type {import("../types.js").VJSFExample} */
const example = {
  title: 'Embedded defaults',
  id: 'embed-defaults',
  description: 'The defaults provider can also be used from inside the schema definition using the `layout.defaults` property.',
  schema: {
    type: 'object',
    layout: {
      defaults: {
        VTextField: {
          variant: 'outlined',
        },
      },
    },
    properties: {
      str1: {
        type: 'string',
        title: 'A text field with a variant defined by the defaults provider',
      },
    },
  },
}

export default example
