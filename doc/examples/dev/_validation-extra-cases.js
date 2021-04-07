const id = '_validation-extra-cases'

const title = 'Additional validation cases'

const description = `Cases not very informative for users, but useful for devs.`

const schema = {
  type: 'object',
  required: ['color1'],
  properties: {
    color1: {
      title: `I'm a required color with initial value`,
      type: 'string',
      'x-display': 'color-picker'
    }
  }
}

const model = {
  color1: '#00bcd4'
}

export default { id, title, description, schema, model }
