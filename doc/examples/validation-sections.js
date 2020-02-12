const id = 'validation-sections'

const title = 'Sections validation'

const description = `A section validity depends on the validity of all its children properties.

This is used to display an error color on broken tabs for example.

Click on the button at bottom-right of the example to trigger validation.`

const schema = {
  type: 'object',
  'x-display': 'tabs',
  properties: {
    section1: {
      type: 'object',
      title: `Section 1`,
      required: ['requiredStringProp1'],
      properties: {
        requiredStringProp1: { type: 'string', title: `I'm a required string` }
      }
    },
    section2: {
      type: 'object',
      title: `Section 2`,
      required: ['requiredStringProp2'],
      properties: {
        requiredStringProp2: { type: 'string', title: `I'm another required string` }
      }
    }
  }
}

const model = {}

export default { id, title, description, schema, model }
