const id = 'date-picker'

const title = 'Dates'

const description = `The formats relative to dates are managed using the date and time pickers from Vuetify.`

const schema = {
  type: 'object',
  properties: {
    dateProp: { type: 'string', title: `I'm a simple date`, format: 'date', description: 'This description is used as a help message.' },
    timeProp: { type: 'string', title: `I'm a simple time of day`, format: 'time' },
    dateTimeProp: { type: 'string', title: `I'm a date with time`, format: 'date-time' }
  }
}

const model = {}

const options = {}

export default { id, title, description, schema, model, options }
