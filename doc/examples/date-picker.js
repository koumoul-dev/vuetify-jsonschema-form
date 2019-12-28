exports.id = 'dates'

exports.title = 'Dates'

exports.description = `The formats relative to dates are managed using the date and time pickers from Vuetify.`

exports.schema = {
  type: 'object',
  properties: {
    dateProp: { type: 'string', title: `I'm a simple date`, format: 'date' },
    dateTimeProp: { type: 'string', title: `I'm a date with time`, format: 'date-time' },
    dateTime: { type: 'string', title: `I'm a simple time of day`, format: 'time' }
  }
}

exports.model = {
  firstName: 'Alban',
  lastName: 'Mouton'
}

exports.options = {}
