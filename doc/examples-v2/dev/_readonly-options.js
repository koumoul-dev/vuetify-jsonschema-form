const id = '_readonly-options'

const title = 'Readonly rendering options'

const description = ''

const schema = {
  type: 'object',
  properties: {
    array1: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          stringPropBasic: { type: 'string' },
          stringPropHidden: { type: 'string', 'x-options': { hideInArrayItem: true } },
          stringPropHiddenLabel: { type: 'string', 'x-options': { hideReadOnlyLabels: true } },
          stringPropHiddenEmpty: { type: 'string', 'x-options': { hideReadOnlyEmpty: true } },
          stringPropHiddenTooltip: { type: 'string', 'x-options': { hideReadOnlyTooltips: true }, description: 'A tooltip' },
          stringPropHiddenProps: { type: 'string', 'x-options': { readOnlyFieldProps: { label: 'Readonly label' } } }
        }
      }
    },
    array2: {
      type: 'array',
      'x-options': { hideReadOnly: true },
      items: {
        type: 'object',
        properties: {
          stringPropBasic: { type: 'string' },
          stringPropRO: { type: 'string', readOnly: true }
        }
      }
    },
    array3: {
      type: 'array',
      'x-options': { deleteReadOnly: true },
      items: {
        type: 'object',
        properties: {
          stringPropBasic: { type: 'string' },
          stringPropRO: { type: 'string', readOnly: true }
        }
      }
    }
  }
}

const model = {
  array1: [{
    stringPropBasic: 'val 1',
    stringPropHidden: 'val 1',
    stringPropHiddenLabel: 'val with hidden label',
    stringPropHiddenEmpty: 'val 1'
  }, {
    stringPropBasic: 'val 2',
    stringPropHidden: 'val 2',
    stringPropHiddenLabel: 'val 2'
  }],
  array2: [{
    stringPropBasic: 'val 1',
    stringPropRO: 'val 1'
  }],
  array3: [{
    stringPropBasic: 'val 1',
    stringPropRO: 'val 1'
  }]
}
const options = {
  editMode: 'inline'
}

/* const test = (wrapper) => {
  expect(wrapper.vm.valid).toBe(true)
  expect(wrapper.vm.modelWrapper.model.array2[0].stringPropBasic).toBe('val 1')
  expect(wrapper.vm.modelWrapper.model.array2[0].stringPropRO).toBe('val 1')
  expect(wrapper.vm.modelWrapper.model.array3[0].stringPropBasic).toBe('val 1')
  expect(wrapper.vm.modelWrapper.model.array3[0].stringPropRO).toBeUndefined()
} */

export default { id, title, description, schema, model, options }
