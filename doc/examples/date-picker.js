exports.id = 'date-picker'

exports.title = 'Dates'

exports.description = `The formats relative to date management are managed using the the date and time pickers from Vuetify.`

exports.template = `
<p>BIM</p>
`

exports.schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' }
  }
}

exports.model = {
  firstName: 'Alban',
  lastName: 'Mouton'
}

exports.options = {}
