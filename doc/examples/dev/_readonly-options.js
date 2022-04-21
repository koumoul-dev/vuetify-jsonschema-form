const id = '_readonly-options'

const title = 'Readonly rendering options'

const description = ``

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      stringPropBasic: { type: 'string' },
      stringPropHidden: { type: 'string', 'x-options': { hideReadOnly: true } },
      stringPropHiddenLabel: { type: 'string', 'x-options': { hideReadOnlyLabels: true } },
      stringPropHiddenEmpty: { type: 'string', 'x-options': { hideReadOnlyEmpty: true } },
      stringPropHiddenTooltip: { type: 'string', 'x-options': { hideReadOnlyTooltips: true }, description: 'A tooltip' },
      stringPropHiddenProps: { type: 'string', 'x-options': { readOnlyFieldProps: { label: 'Readonly label' } } }
    }
  }
}

const model = [{
  stringPropBasic: 'val 1',
  stringPropHidden: 'val 1',
  stringPropHiddenLabel: 'val 1',
  stringPropHiddenEmpty: 'val 1'
}, {
  stringPropBasic: 'val 2',
  stringPropHidden: 'val 2',
  stringPropHiddenLabel: 'val 2'
}]

const options = {
  editMode: 'inline'
}

export default { id, title, description, schema, model, options }
