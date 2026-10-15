/**
 * Grafts the vjsf `layout` keyword (from @json-layout/vocabulary's
 * layout-keyword schema) onto the draft-07 meta-schema, producing the schema
 * that drives completion/lint/hover in the playground's Schema tab.
 *
 * `$id`/`$schema` are dropped: codemirror-json-schema's resolver must treat
 * every `$ref` as local (`#/...`), never fetch the original remote ids.
 * draft-07's self-recursion (`$ref: "#"`) then resolves to *this* merged
 * root, so `layout` is offered at every nesting level for free.
 */
export function buildVjsfMetaSchema (
  draft: Record<string, any>,
  layoutKeyword: Record<string, any>
): Record<string, any> {
  const { $id: _id, $schema: _schema, ...meta } = draft
  return {
    ...meta,
    $defs: layoutKeyword.$defs,
    properties: {
      ...draft.properties,
      layout: { $ref: '#/$defs/layout-keyword' },
    },
  }
}
