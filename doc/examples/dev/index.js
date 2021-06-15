import resolvedSchema from './_resolved-schema'
import selectFilledDeps from './_select-filled-deps'
import selectFilledHttp from './_select-filled-http'
import prefilledArrayDependency from './_prefilled-array-dependency'
import readOnlySelectIcon from './_readonly-select-icon'
import ValidationExtraCases from './_validation-extra-cases'
import XIf from './_x-if'
import WrongTypes from './_wrong-types'
import LargeForm from './_large-form'
import SimpleArrayValidation from './_simple-array-validation'

const examplesGroup = {
  title: 'Development',
  color: 'primary',
  examples: [
    resolvedSchema,
    selectFilledDeps,
    selectFilledHttp,
    prefilledArrayDependency,
    readOnlySelectIcon,
    ValidationExtraCases,
    XIf,
    WrongTypes,
    LargeForm,
    SimpleArrayValidation
  ]
}

export default examplesGroup
