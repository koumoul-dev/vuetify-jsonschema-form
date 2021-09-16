const id = 'validation-external'

const title = 'External validator'

const description = `You can use an external validation tool to handle more complex validation cases, like formats rules combinations with anyOf/oneOf/allOf, etc. Activate this functionality with the \`useValidator=true\` option.

The messages will often be less intuitive than when they are created by vjsf itself based on simple rules, but this mechanism can help prevent outputting invalid data.

This functionality requires a [JSON schema validator](configuration#validator).`

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
