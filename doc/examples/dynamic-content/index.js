import selectSubschemas from './select-subschemas'
import conditionals from './conditionals'
import conditionalExpr from './conditional-expr'
import selectDeps from './select-deps'
import selectRelativeDeps from './select-relative-deps'
import selectContextDeps from './select-context-deps'

const examplesGroup = {
  title: 'Dynamic content',
  examples: [
    selectSubschemas,
    conditionals,
    conditionalExpr,
    selectDeps,
    selectContextDeps,
    selectRelativeDeps
  ]
}

export default examplesGroup
