const id = 'validation-external'

const title = 'External validation tool'

const description = `You can use an external validation tool to handle more complex validation cases, like formats rules combinations with anyOf/oneOf/allOf, etc. Activate this functionality with the \`useValidator=true\` option.

The messages will often be less intuitive than when they are created by vjsf itself based on simple rules, but this mechanism can help prevent outputing invalid data.

This functionality requires a JSON schema validator. If [Ajv](https://github.com/ajv-validator/ajv) is available as a global variable it will be used, otherwise you can pass an ajv instance in \`options.ajv\` or a validator function in \`options.validator\`. If you chose the latter you must define a function that accepts a schema as parameter and returns another function that will accept the model as parameter and return null for a valid schema or an error for an invalid schema. If you load third-party.js Ajv will be used along with ajv-formats and ajv-i18n.`

const schema = {
  type: 'object',
  required: ['stringPropWithFormats'],
  'x-display': 'tabs',
  properties: {
    stringPropWithFormats: {
      title: 'I\'m a string with combined validation rules',
      'x-options': { useAjv: true },
      anyOf: [
        { format: 'email', type: 'string' },
        { format: 'uri', type: 'string' }
      ]
    },
    invalidSection: {
      type: 'object',
      title: 'Invalid section',
      description: 'This section has a required property that is not actually defined in the schema, it can never be valid.',
      required: ['stringProp1', 'stringProp2'],
      properties: {
        stringProp2: { type: 'string', title: 'I\'m a required string prop' }
      }
    }
  }
}

const model = {}

const options = {
  useValidator: true,
  locale: 'en'
}

export default { id, title, description, schema, model, options }
