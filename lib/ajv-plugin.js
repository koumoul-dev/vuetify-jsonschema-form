module.exports = (ajv, metaSchema) => {
  ajv.addFormat('hexcolor', /^#[0-9A-Fa-f]{6,8}$/)
  ajv.addKeyword({
    keyword: 'formOptions',
    type: 'object',
    schemaType: 'object',
    metaSchema: metaSchema.properties.formOptions
  })
  ajv.addKeyword({
    keyword: 'visible',
    schemaType: 'boolean',
    metaSchema: metaSchema.properties.visible
  })
  ajv.addKeyword({
    keyword: 'separator',
    type: 'string',
    schemaType: 'string',
    metaSchema: metaSchema.properties.separator
  })
  // TODO: complete definition of these properties
  ajv.addKeyword('icon')

  // deprecated keywords
  ajv.addKeyword('x-fromUrl')
  ajv.addKeyword('x-fromData')
  ajv.addKeyword('x-itemKey')
  ajv.addKeyword('x-itemTitle')
  ajv.addKeyword('x-itemIcon')
  ajv.addKeyword('x-itemsProp')
  ajv.addKeyword('x-options')
  ajv.addKeyword('x-cols')
  ajv.addKeyword('x-class')
  ajv.addKeyword('x-style')
  ajv.addKeyword('x-props')
  ajv.addKeyword('x-slots')
  ajv.addKeyword('x-display')
  ajv.addKeyword('displayTable')
  ajv.addKeyword('x-if')
  ajv.addKeyword('x-rules')
}
