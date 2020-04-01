const id = 'classes'

const title = 'Classes and styles'

const description = `You can define classes on the wrapping element of each property using a \`x-class\` annotation. If you use layout management classes you can then position properties next to each other for examples.

To write CSS rules directly on the wrapping element of a property use the \`x-style\` annotation.

There are also classes that can be defined as options: \`objectContainerClass\`, \`sectionsClass\`, \`sectionsTitlesClasses\`, \`childrenClass\`.`

const schema = {
  type: 'object',
  properties: {
    stringPropHalf: { type: 'string', title: `I'm a half width string`, 'x-class': 'xs6' },
    stringPropHalf2: { type: 'string', title: `I'm another half width string`, 'x-class': 'xs6' },
    stringPropStyle: { type: 'string', title: `I'm a string with style`, 'x-style': 'background-color: pink; padding-left: 20px;' }
  }
}

const model = {}

export default { id, title, description, schema, model }
