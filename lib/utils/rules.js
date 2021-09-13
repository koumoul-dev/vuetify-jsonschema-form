import { deepEqual } from 'fast-equals'

export const getRules = (schema, fullSchema, options, required, isOneOfSelect) => {
  const rules = []
  if (required) {
    rules.push((val) => (val !== undefined && val !== null && val !== '') || options.messages.required)
  }
  if (fullSchema.type === 'array' && fullSchema.minItems !== undefined) {
    const msg = options.messages.minItems.replace('{minItems}', fullSchema.minItems.toLocaleString(options.locale))
    rules.push((val) => (!val || val.length >= fullSchema.minItems) || msg)
  }
  if (fullSchema.type === 'array' && fullSchema.maxItems !== undefined) {
    const msg = options.messages.maxItems.replace('{maxItems}', fullSchema.maxItems.toLocaleString(options.locale))
    rules.push((val) => (!val || val.length <= fullSchema.maxItems) || msg)
  }
  if (fullSchema.type === 'string' && fullSchema.minLength !== undefined) {
    const msg = options.messages.minLength.replace('{minLength}', fullSchema.minLength.toLocaleString(options.locale))
    rules.push((val) => (val === undefined || val === null || val.length >= fullSchema.minLength) || msg)
  }
  if (fullSchema.type === 'string' && fullSchema.maxLength !== undefined) {
    const msg = options.messages.maxLength.replace('{maxLength}', fullSchema.maxLength.toLocaleString(options.locale))
    rules.push((val) => (val === undefined || val === null || val.length <= fullSchema.maxLength) || msg)
  }
  if (fullSchema.type === 'string' && fullSchema.patternRegexp !== undefined) {
    const msg = options.messages.pattern.replace('{pattern}', fullSchema.pattern)
    rules.push((val) => (val === undefined || val === null || !!val.match(fullSchema.patternRegexp)) || msg)
  }
  if (['number', 'integer'].includes(fullSchema.type) && fullSchema.maximum !== undefined) {
    const msg = options.messages.maximum.replace('{maximum}', fullSchema.maximum.toLocaleString(options.locale))
    rules.push((val) => (val === undefined || val === null || val <= fullSchema.maximum) || msg)
  }
  if (['number', 'integer'].includes(fullSchema.type) && fullSchema.exclusiveMaximum !== undefined) {
    const msg = options.messages.exclusiveMaximum.replace('{exclusiveMaximum}', fullSchema.exclusiveMaximum.toLocaleString(options.locale))
    rules.push((val) => (val === undefined || val === null || val < fullSchema.exclusiveMaximum) || msg)
  }
  if (['number', 'integer'].includes(fullSchema.type) && fullSchema.minimum !== undefined) {
    const msg = options.messages.minimum.replace('{minimum}', fullSchema.minimum.toLocaleString(options.locale))
    rules.push((val) => (val === undefined || val === null || val >= fullSchema.minimum) || msg)
  }
  if (['number', 'integer'].includes(fullSchema.type) && fullSchema.exclusiveMinimum !== undefined) {
    const msg = options.messages.exclusiveMinimum.replace('{exclusiveMinimum}', fullSchema.exclusiveMinimum.toLocaleString(options.locale))
    rules.push((val) => (val === undefined || val === null || val > fullSchema.exclusiveMinimum) || msg)
  }
  if (fullSchema.enum) {
    rules.push((val) => (val === undefined || val === null || !!fullSchema.enum.find(item => deepEqual(item, val))) || '')
  }
  if (fullSchema.type === 'array' && fullSchema.items.enum) {
    rules.push((val) => (val === undefined || val === null || !val.find(valItem => !fullSchema.items.enum.find(item => deepEqual(item, valItem)))) || '')
  }
  if (isOneOfSelect && fullSchema.type !== 'array') {
    rules.push((val) => (val === undefined || val === null || !!fullSchema.oneOf.find(item => deepEqual(item.const, val))) || '')
  }
  if (isOneOfSelect && fullSchema.type === 'array') {
    rules.push((val) => (val === undefined || val === null || !val.find(valItem => !fullSchema.items.oneOf.find(item => deepEqual(item.const, valItem)))) || '')
  }

  // ajv validation
  if (options.validator && options.useValidator) {
    rules.push(getAjvRule(schema, options.validator))
  }

  const customRules = (fullSchema['x-rules'] || []).map(rule => {
    if (typeof rule === 'string') {
      const ruleFunction = options.rules && options.rules[rule]
      if (!ruleFunction) console.error(`rule ${rule} is referenced but not define in options`)
      return ruleFunction
    } else {
      console.error(`rule should be a string, received ${typeof rule}`)
    }
  }).filter(rule => !!rule)
  return rules.concat(customRules)
}

const getAjvRule = (schema, validator, locale) => {
  const validate = validator(schema)
  return (val) => {
    if (val === null || val === undefined) return true
    const error = validate(val)
    return !error || error
  }
}
