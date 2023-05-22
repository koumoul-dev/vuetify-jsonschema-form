const id = 'sections-stepper'

const title = 'Sections as stepper'

const description = `Use the \`x-display="stepper"\` or \`x-display="vertical-stepper"\` annotation to display sections as a stepper. You can also use the \`rootDisplay\` option to display root sections as a stepper regardless of the content of the schema.

You can use the \`x-props\`annotation or the \`stepperProps\` / \`verticalStepperProps\` options to configure rendering.`

const schema = {
  type: 'object',
  properties: {
    stepperProp: {
      type: 'object',
      'x-display': 'stepper',
      title: 'I\'m an object with sections rendered in a stepper.',
      allOf: [{
        title: 'I\'m a section',
        description: 'I\'m a description shown as a paragraph on top of section',
        type: 'object',
        required: ['stringProp1'],
        properties: {
          stringProp1: { type: 'string', title: 'I\'m a required property in section 1' }
        }
      },
      {
        title: 'I\'m another section',
        type: 'object',
        required: ['stringProp2'],
        properties: {
          stringProp2: { type: 'string', title: 'I\'m a required property in section 2' }
        }
      }]
    },
    verticalStepperProp: {
      type: 'object',
      'x-display': 'vertical-stepper',
      title: 'I\'m an object with sections rendered in a vertical stepper.',
      allOf: [{
        title: 'I\'m a section',
        description: 'I\'m a description shown as a paragraph on top of section',
        type: 'object',
        required: ['stringProp1'],
        properties: {
          stringProp1: { type: 'string', title: 'I\'m a required property in section 1' }
        }
      },
      {
        title: 'I\'m another section',
        type: 'object',
        required: ['stringProp2'],
        properties: {
          stringProp2: { type: 'string', title: 'I\'m a required property in section 2' }
        }
      }]
    }
  }

}

const model = {}

export default { id, title, description, schema, model }
