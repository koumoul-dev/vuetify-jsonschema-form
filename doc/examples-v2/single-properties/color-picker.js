const id = 'colors'

const title = 'Colors'

const description = `The format \`hexcolor\` is used to display a color picker, you can also use the \`x-display=color-picker\` annotation. If using the format syntax, please note that hexcolor is not a standard format (I'm pretty sure it was once a proposal) and you might need to declare it with your JSON schema validator.

Example ajv format: \`ajv.addFormat('hexcolor', /^#[0-9A-Fa-f]{6,8}$/)\`

You can customize the color picker using either the \`colorPickerProps\` option or the \`x-props\` annotation.
`

const schema = {
  type: 'object',
  properties: {
    colorProp: { type: 'string', title: `I'm a color`, format: 'hexcolor', description: 'This description is used as a help message.' },
    colorProp2: { type: 'string', title: `I'm a color with a swatches based picker`, format: 'hexcolor', 'x-props': { showSwatches: true, hideCanvas: true, hideInputs: true, hideModeSwitch: true } }
  }
}

const model = {}

export default { id, title, description, schema, model }
