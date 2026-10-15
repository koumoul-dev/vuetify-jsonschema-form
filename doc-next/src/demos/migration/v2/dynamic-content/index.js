import selectSubschemas from './select-subschemas.js'
import conditionals from './conditionals.js'
import conditionalExpr from './conditional-expr.js'
import selectDeps from './select-deps.js'
import selectRelativeDeps from './select-relative-deps.js'
import selectContextDeps from './select-context-deps.js'
import selectSchemaDeps from './select-schema-deps.js'

const examplesGroup = {
  title: 'Dynamic content',
  examples: [
    selectSubschemas,
    conditionals,
    conditionalExpr,
    selectDeps,
    selectContextDeps,
    selectRelativeDeps,
    selectSchemaDeps,
  ],
}

export default examplesGroup
