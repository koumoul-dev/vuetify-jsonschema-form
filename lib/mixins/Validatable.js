// we bubble up and down validation instructions from the top form to the lower fields and through each container levels
// each intermediate level is aware of its validation state wich is useful in sections management, complex array, etc.
import { deepEqual } from 'fast-equals'

export default {
  inject: ['form'],
  provide() {
    return {
      form: {
        register: this.register,
        unregister: this.unregister
      }
    }
  },
  props: {
    separateValidation: {
      type: Boolean,
      default: false
    },
    initialValidation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputs: [],
      validated: false,
      shouldValidate: false,
      dedupChildrenWithValidatedErrors: []
    }
  },
  computed: {
    childrenInputs() {
      this.debug('compute childrenInputs')
      return this.inputs.reduce((a, input, i) => { a[input.modelKey || i] = input; return a }, {})
    },
    hasError() {
      this.debug('compute hasError')
      return !!this.inputs.find(input => input.hasError) || !!this.containerError
    },
    hasValidatedChildError() {
      this.debug('compute hasValidatedChildError')
      return !!this.inputs.find(input => input.hasValidatedChildError || (input.hasError && (this.initialValidation || input.validated || input.shouldValidate)))
    },
    childrenWithValidatedErrors() {
      this.debug('compute childrenWithValidatedErrors')
      return Object.keys(this.childrenInputs).filter(key => !!this.childrenInputs[key].hasValidatedChildError)
    }
  },
  watch: {
    childrenWithValidatedErrors() {
      // the "dedup version" is there only to trigger less renderings
      if (!deepEqual(this.childrenWithValidatedErrors, this.dedupChildrenWithValidatedErrors)) {
        this.debug('set dedupChildrenWithValidatedErrors', JSON.stringify(this.childrenWithValidatedErrors))
        this.dedupChildrenWithValidatedErrors = this.childrenWithValidatedErrors
      }
    }
  },
  created () {
    if (!this.separateValidation) this.form && this.form.register(this)
  },
  mounted() {
    const initialValidation = this.fullOptions.initialValidation
    if (initialValidation === 'all' && !this.modelRoot) {
      this.validate(true)
    }
    if (initialValidation === 'defined' && this.initiallyDefined && !this.isObjectContainer) {
      this.validate(true)
    }
  },
  beforeDestroy () {
    if (!this.separateValidation) this.form && this.form.unregister(this)
  },
  methods: {
    register(input) {
      this.debug('register', input.modelKey)
      this.inputs.push(input)
    },
    unregister(input) {
      this.debug('unregister', input.modelKey)
      this.inputs = this.inputs.filter(i => i._uid !== input._uid)
    },
    validate(force) {
      this.validated = true
      return this.inputs.filter(input => !input.validate(force)).length === 0
    },
    reset() {
      this.inputs.forEach(input => input.reset())
    },
    resetValidation() {
      this.shouldValidate = false
      this.validated = false
      this.inputs.forEach(input => input.resetValidation())
    }
  }
}
