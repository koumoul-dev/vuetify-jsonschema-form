exports.id = 'dates'

exports.title = 'Dates'

exports.description = `The formats relative to dates are managed using the date and time pickers from Vuetify.`

exports.schema = {
  type: 'object',
  properties: {
    dateProp: { type: 'string', title: `I'm a simple date`, format: 'date' },
    timeProp: { type: 'string', title: `I'm a simple time of day`, format: 'time' },
    dateTimeProp: { type: 'string', title: `I'm a date with time`, format: 'date-time' }
  }
}

exports.model = {}

exports.options = {}
