import resolvedSchema from './_resolved-schema.js'
import selectFilledDeps from './_select-filled-deps.js'
import prefilledSelect from './_prefilled-select.js'
import selectFilledHttp from './_select-filled-http.js'
import readOnlySelectIcon from './_readonly-select-icon.js'
import ValidationExtraCases from './_validation-extra-cases.js'
import WrongTypes from './_wrong-types.js'
import LargeForm from './_large-form.js'
import SimpleArrayValidation from './_simple-array-validation.js'
import NestedAllofOneof from './_nested_allof_oneof.js'
import PrefilledArrayWrongType from './_prefilled_array_wrong_type.js'
import PrefilledArrayDependency from './_prefilled_array_dependency.js'
import WrongEnumValue from './_wrong-enum-value.js'
import EnumConst from './_enum_const.js'
import Separator from './_separator.js'
import InfiniteLoop from './_infinite_loop.js'
import ArrayRichExpression from './_array_rich_expression.js'
import ArrayOneOfTitle from './_array_oneof_title.js'
import ReadonlyOptions from './_readonly-options.js'
import StringDefault from './_string_default.js'

const examplesGroup = {
  title: 'Development',
  color: 'primary',
  examples: [
    resolvedSchema,
    selectFilledDeps,
    selectFilledHttp,
    prefilledSelect,
    readOnlySelectIcon,
    ValidationExtraCases,
    WrongTypes,
    LargeForm,
    SimpleArrayValidation,
    NestedAllofOneof,
    PrefilledArrayWrongType,
    PrefilledArrayDependency,
    WrongEnumValue,
    EnumConst,
    Separator,
    InfiniteLoop,
    ArrayRichExpression,
    ArrayOneOfTitle,
    ReadonlyOptions,
    StringDefault
  ]
}

export default examplesGroup
