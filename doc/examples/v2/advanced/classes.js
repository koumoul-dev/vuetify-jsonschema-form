const id = 'classes'

const title = 'Layout, classes and styles'

const description = `You can define classes on the wrapping element of each property using the \`x-class\` annotation.

To write CSS rules directly on the wrapping element of a property use the \`x-style\` annotation.

To customize the responsive layout of your form you can use the \`x-cols\` annotation or the \`fieldColProps\` option.

There are also many options that can be used to apply classes to different parts of your form: \`objectContainerClass\`, \`sectionsClass\`, \`sectionsTitlesClasses\`, \`childrenClass\`, etc.`

const schema = {
  type: 'object',
  properties: {
    stringPropHalf: { 'type': 'string', 'title': 'I\'m a half width string using x-cols', 'x-cols': 6 },
    stringPropHalf2: { 'type': 'string', 'title': 'I\'m another half width string using fieldColProps option', 'x-options': { fieldColProps: { cols: 6 } } },
    stringPropClass: { 'type': 'string', 'title': 'I\'m a string with class pl-10', 'x-class': 'pl-10' },
    stringPropStyle: { 'type': 'string', 'title': 'I\'m a string with style', 'x-style': 'background-color: pink; padding-left: 20px;' },
  },
}

const model = {}

export default { id, title, description, schema, model }
