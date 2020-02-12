const id = 'validation-basic'

const title = 'Basic validation'

const description = `Some JSON schema syntax elements are translated as validation rules: required, format, length, pattern, etc.

If you wrap the \`vjsf\` element in a \`v-form\` the validation mechanisms will work.

Click the button at bottom-right of the example to trigger validation.`

const schema = {
  type: 'object',
  required: ['requiredStringProp'],
  properties: {
    requiredStringProp: { type: 'string', title: `I'm a required string` }
  }
}

const model = {}

export default { id, title, description, schema, model }
