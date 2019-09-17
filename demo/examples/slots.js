module.exports = {
  title: 'Slots',
  schema: {
    type: 'object',
    properties: {
      fullKeySlot: {
        title: 'Full key slot',
        type: 'string',
        description: 'This property is rendered using a slot named with its key "firstName".'
      },
      customDisplay1: {
        title: 'Custom display 1',
        type: 'string',
        description: 'This property is rendered using a slot named with a x-display="custom-XXX" property.',
        'x-display': 'custom-1'
      }
    }
  },
  data: {}
}
