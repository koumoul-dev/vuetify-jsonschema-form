const id = 'validation-basic'

const title = 'Basic validation'

const description = `Some JSON schema syntax elements are translated as validation rules: required, format, length, pattern, etc.

If you wrap the \`vjsf\` element in a \`v-form\` the validation mechanisms will work.

Click on the button at bottom-right of the example to trigger validation.`

const schema = {
  type: 'object',
  required: ['requiredStringProp'],
  properties: {
    requiredStringProp: { type: 'string', title: `I'm a required string` },
    limitedInteger: { type: 'integer', title: `I'm a integer with min/max`, minimum: 0, maximum: 100 }
  }
}

const model = {}

export default { id, title, description, schema, model }
