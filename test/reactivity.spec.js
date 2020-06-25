import 'babel-polyfill'
const utils = require('./utils')

describe('Special cases of reactivity', () => {
  test('Update sub schema when key changes', async () => {
    const model = {}
    const wrapper = utils.getExampleWrapper({
      schema: {
        type: 'object',
        oneOf: [{
          properties: {
            sub: { type: 'string', const: 'sub1' },
            string1: { type: 'string' }
          }
        }, {
          properties: {
            sub: { type: 'string', const: 'sub2' },
            string2: { type: 'string' }
          }
        }]
      },
      model
    })

    // only the root property
    expect(wrapper.findAll('.vjsf-property')).toHaveLength(1)
    const rootProperty = wrapper.find('.vjsf-property-root')
    expect(rootProperty.vm.fullKey).toEqual('root')

    // change sub schema
    const rootSelect = wrapper.find('#root')
    rootSelect.setValue('sub1')
    // see https://alexjover.com/blog/test-computed-properties-and-watchers-in-vue-js-components-with-jest/
    expect(rootProperty.vm.value.sub).toEqual('sub1')
    expect(model.sub).toEqual('sub1')
    await rootProperty.vm.$nextTick()
    console.log(model.sub)
    model.sub = 'sub2'
    await rootProperty.vm.$nextTick()
    expect(rootProperty.vm.value.sub).toEqual('sub2')
    // setTimeout(resolve, 1000)
    // rootSelect.trigger('input')

    // expect(wrapper.findAll('.vjsf-property')).toHaveLength(2)
  })
})
