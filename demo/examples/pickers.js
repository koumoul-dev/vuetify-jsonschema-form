module.exports = {
  title: 'Pickers: date, time and color.',
  schema: {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Person',
    'type': 'object',
    'properties': {
      'aDate': {
        'type': 'string',
        format: 'date',
        'description': 'A date.'
      },
      'aDateTime': {
        'type': 'string',
        format: 'date-time'
      },
      'aHexColor': {
        'type': 'string',
        format: 'hexcolor'
      }
    }
  },
  data: {
    aHexColor: '#03A9F4'
    // aDate: '1983-11-28T',
    // aDateTime: '2018-09-17T21:17:40.033Z'
  }
}
