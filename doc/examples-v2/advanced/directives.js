const id = 'directives'

const title = 'Directives'

const description = `You can use the \`x-directives\` annotation to instantiate Vue directives on the input components used to render properties. This is directly equal to the directives part of a [render data object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth).`

const schema = {
  type: 'object',
  properties: {
    stringWithMask: { type: 'string', title: `I'm a string with a mask ####-##`, 'x-directives': [{ name: 'mask', value: '####-##' }] }
  }
}

const model = {}

export default { id, title, description, schema, model }
