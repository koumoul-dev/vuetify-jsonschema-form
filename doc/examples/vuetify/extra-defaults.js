/** @type {import("../types.js").VJSFExample} */
const example = {
  title: 'Extra defaults',
  id: 'extra-defaults',
  description: 'VJSF extends the Vuetify defaults provider system with its own components. This lets you define fine-grained defaults for each component type.',
  schema: {
    type: 'object',
    properties: {
      str1: {
        type: 'string',
        title: 'A text field with outlined variant',
      },
      nb1: {
        type: 'number',
        title: 'A number field with underlined variant',
      },
      obj1: {
        type: 'object',
        title: 'Tabs with custom sheet props',
        layout: 'tabs',
        properties: {
          str1: { type: 'string' },
          str2: { type: 'string' },
        },
      },
    },
  },
  defaultProps: {
    'VjsfTextField': {
      VTextField: {
        variant: 'outlined',
      },
    },
    'VjsfNumberField': {
      VTextField: {
        variant: 'underlined',
      },
    },
    'VjsfTabs-VSheet': {
      border: false,
      elevation: 4,
      color: 'primary',
      rounded: true,
    },
  },
}

export default example
