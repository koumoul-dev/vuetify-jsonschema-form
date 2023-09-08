import selectSubschemas from './select-subschemas'
import conditionals from './conditionals'
import conditionalExpr from './conditional-expr'
import selectDeps from './select-deps'
import selectRelativeDeps from './select-relative-deps'
import selectContextDeps from './select-context-deps'
import selectSchemaDeps from './select-schema-deps'

const examplesGroup = {
  title: 'Dynamic content',
  examples: [
    selectSubschemas,
    conditionals,
    conditionalExpr,
    selectDeps,
    selectContextDeps,
    selectRelativeDeps,
    selectSchemaDeps
  ]
}

export default examplesGroup
