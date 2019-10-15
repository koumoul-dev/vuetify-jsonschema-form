const keys = [
  'basic',
  'arrays',
  'pickers',
  'validation',
  'selects',
  'nested',
  'dependencies',
  'combinations',
  'accordion',
  'tabs',
  'vertical-tabs',
  'icons',
  'slots'
]

module.exports = keys.map(key => ({ ...require('./' + key), key }))
