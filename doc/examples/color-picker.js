const id = 'colors'

const title = 'Colors'

const description = `The format \`hexcolor\` is used to display a color picker. Please not that it is not a standard format (I'm pretty sure it was once a proposal) and you might need to declare it with your JSON schema validator.

Default uses [Vue Swatches](https://saintplay.github.io/vue-swatches/) but you can switch to a more complete color picker using [vue-color](https://github.com/xiaokaike/vue-color) with the \`x-display="color-picker"\` annotation.
`

const schema = {
  type: 'object',
  properties: {
    swatchColorProp: { type: 'string', title: `I'm a color picked with Vue Swatches`, format: 'hexcolor', description: 'This description is used as a help message.' },
    colorPickerProp: { type: 'string', title: `I'm a color picked with vue-color`, format: 'hexcolor', 'x-display': 'color-picker' }
  }
}

const model = {}

export default { id, title, description, schema, model }
