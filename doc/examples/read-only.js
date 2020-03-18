const id = 'read-only'

const title = 'Read only content'

const description = `All properties with \`readOnly=true\` in schema will be rendered as a disabled field. This is propagated downward in the schema, so a read-only object will have all its children rendered as disabled field.

You can also disable the whole form using \`disableAll=true\` option.

You can hide a single property using the \`x-display=hidden\` annotation or hide by default all read-only properties using the \`hideReadOnly=true\` option.`

const schema = {
  type: 'object',
  properties: {
    readOnlyProp: { type: 'string', title: `I'm a read-only string`, readOnly: true },
    readOnlySection: {
      type: 'object',
      title: `I'm a section with readOnly=true in schema`,
      readOnly: true,
      properties: {
        stringProp: { type: 'string', title: `I'm a string in a read-only section` }
      }
    },
    disabledSection: {
      type: 'object',
      title: `I'm a section with disableAll=true in options`,
      'x-options': { disableAll: true },
      properties: {
        stringProp: { type: 'string', title: `I'm a string in a disabled section` }
      }
    },
    hideReadonlySection: {
      type: 'object',
      title: `I'm a section whose read-only content is hidden`,
      'x-options': { hideReadOnly: true },
      properties: {
        readOnlyProp: { type: 'string', title: `I'm a string in a disabled section`, readOnly: true },
        stringProp: { type: 'string', title: `I'm a string` }
      }
    }
  }
}

const model = {
  readOnlyProp: 'read-only value',
  readOnlySection: {
    stringProp: 'read-only value'
  },
  disabledSection: {
    stringProp: 'disabled value'
  }
}

export default { id, title, description, schema, model }
