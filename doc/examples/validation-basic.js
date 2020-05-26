const id = 'validation-basic'

const title = 'Basic validation'

const description = `Some JSON schema syntax elements are translated as validation rules: required, length, pattern, etc.

You can also use the \`x-rules\` annotation to set custom rules, either directly as a function or indirectly as a string referencing a function in the \`rules\` option.

If you wrap the \`vjsf\` element in a \`v-form\` the validation mechanisms will work.

Click on the button at bottom-right of the example to trigger validation.`

const schema = {
  type: 'object',
  required: ['requiredStringProp'],
  properties: {
    requiredStringProp: { type: 'string', title: `I'm a required string` },
    patternStringProp: { type: 'string', title: `I'm a string with a pattern`, pattern: '^[a-zA-Z]*$', 'x-options': { messages: { pattern: 'Only letters are accepted' } } },
    ruleStringProp: { type: 'number', title: `I'm a string with a custom rule`, 'x-rules': ['even'] },
    limitedInteger: { type: 'integer', title: `I'm a integer with min/max value`, minimum: 0, maximum: 100 },
    limitedString: { type: 'string', title: `I'm a string with min/max length`, minLength: 10, maxLength: 100 },
    limitedArray: { type: 'array', title: `I'm an array with min/max items`, items: { type: 'string' }, minItems: 1, maxItems: 100 },
    patternStringArray: { type: 'array', title: `I'm an array whose items have a pattern`, items: { type: 'string', pattern: '^[a-zA-Z]*$', 'x-options': { messages: { pattern: 'Only letters are accepted' } } } }
  }
}

const model = {
  limitedInteger: 101,
  limitedString: 'abc',
  limitedArray: ['abc']
}

const options = {
  rules: {
    even: (val) => (!val || val % 2 === 0 || 'Only even numbers accepted')
  }
}

export default { id, title, description, schema, model, options }
