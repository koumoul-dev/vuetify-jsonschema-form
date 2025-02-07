const id = 'date-picker'

const title = 'Dates'

const warning = 'The "date-time" format is not supported yet.'

const description = `The formats relative to dates are managed using the date and time pickers from Vuetify.

The formatting and the pickers are heavily dependent on the \`locale\` option. To customize the formatting you can look at the \`Formatting functions\` section in the configuration documentation.

You can define props for the underlying components using the timePickerProps and datePickerProps options.

Notes about timezone management:
  - Date-Times are stored with the user's timezone offset (for example 2020-04-03T21:07:43+02:00 instead of the usual result of \`toISOString\` 2020-04-03T19:07:43.152Z, this gives more contextual information to your application
  - Times alone are stored without representing the offset but also without applying it in the first place. Meaning that if the user select 00:00 we will store 00:00:00Z whatever his timezone. This is because without the context of a date timezone management becomes meaningless.`

const schema = {
  type: 'object',
  properties: {
    dateProp: { type: 'string', title: 'I\'m a simple date', format: 'date', description: 'This description is used as a help message.' },
    timeProp: { type: 'string', title: 'I\'m a simple time of day', format: 'time' },
    dateTimeProp: { type: 'string', title: 'I\'m a date with time', format: 'date-time' },
  },
}

const model = {}

export default { id, title, warning, description, schema, model }
