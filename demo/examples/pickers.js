module.exports = {
  title: 'Pickers: date, time and color.',
  schema: {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Person',
    'type': 'object',
    'properties': {
      'aDate': {
        title: 'A date',
        'type': 'string',
        format: 'date',
        'description': 'A date.'
      },
      'aDateTime': {
        title: 'A date in date-time format',
        'type': 'string',
        format: 'date-time'
      },
      'colorSwatches': {
        title: 'A color using the minimalist swatches picker',
        description: 'In hex format',
        'type': 'string',
        format: 'hexcolor'
      },
      'colorPicker': {
        title: 'A color using a more complete picker',
        description: 'In hex format',
        'type': 'string',
        format: 'hexcolor',
        'x-display': 'color-picker'
      }
    }
  },
  data: {
    // aHexColor: '#03A9F4'
    // aDate: '1983-11-28T',
    // aDateTime: '2018-09-17T21:17:40.033Z'
  }
}
