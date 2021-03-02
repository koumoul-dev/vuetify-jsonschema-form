const id = 'sections-stepper'

const title = 'Sections as stepper (beta)'

const description = `Use the \`x-display="stepper"\` annotation to display sections as a stepper. You can also use the \`rootDisplay\` option to display root sections as a stepper regardless of the content of the schema.

You can use the \`x-props\`annotation or the \`stepperProps\` option to configure rendering.`

const schema = {
  type: 'object',
  'x-display': 'stepper',
  description: `I'm an object with sections rendered in a stepper.`,
  allOf: [{
    title: `I'm a section`,
    description: `I'm a description shown as a paragraph on top of section`,
    type: 'object',
    properties: {
      stringProp1: { type: 'string', title: `I'm a property in section 1` }
    }
  },
  {
    title: `I'm another section`,
    type: 'object',
    properties: {
      stringProp2: { type: 'string', title: `I'm a property in section 2` }
    }
  }]
}

const model = {}

export default { id, title, description, schema, model }
