// we bubble up and down validation instructions from the top form to the lower fields and through each container levels
// each intermediate level is aware of its validation state which is useful in sections management, complex array, etc.
import { deepEqual } from 'fast-equals'

export default {
  inject: ['form'],
  provide() {
    return {
      form: {
        register: this.register,
        unregister: this.unregister,
        fastForwardEvent: this.fastForwardEvent,
        getExprNode: this.getExprNode
      }
    }
  },
  props: {
    separateValidation: {
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
      return this.inputs.reduce((a, input, i) => { a[input.modelKey || i] = input; return a }, {})
    },
    hasError() {
      return !!this.inputs.find(input => input.hasError) || !!this.localRuleError
    },
    hasValidatedError() {
      return !!this.inputs.find(input => input.hasValidatedError || (input.hasError && (input.validated || input.shouldValidate))) ||
        (this.localRuleError && (this.validated || this.shouldValidate))
    },
    childrenWithValidatedErrors() {
      return Object.keys(this.childrenInputs).filter(key => !!this.childrenInputs[key].hasValidatedError)
    },
    localRuleError() {
      if (!this.validated || !this.rules || !this.rules.length) return false
      const brokenRule = this.rules.find(rule => {
        return typeof rule(this.value) === 'string'
      })
      return brokenRule && brokenRule(this.value)
    }
  },
  watch: {
    childrenWithValidatedErrors() {
      // the "dedup version" is there only to trigger less renderings
      // nextTick prevents some hard to debug infinite loops
      this.$nextTick(() => {
        if (!deepEqual(this.childrenWithValidatedErrors, this.dedupChildrenWithValidatedErrors)) {
          this.dedupChildrenWithValidatedErrors = this.childrenWithValidatedErrors
        }
      })
    }
  },
  created () {
    if (!this.separateValidation) this.form && this.form.register(this)
  },
  beforeDestroy () {
    if (!this.separateValidation) this.form && this.form.unregister(this)
  },
  methods: {
    register(input) {
      if (this.validated) input.validate(true)
      this.inputs.push(input)
    },
    unregister(input) {
      this.inputs = this.inputs.filter(i => i._uid !== input._uid)
    },
    validate(force) {
      this.validated = true
      const results = this.inputs.map((input, i) => ({
        valid: input.validate(force),
        key: input.modelKey || i
      }))
      return !results.find(r => !r.valid)
    },
    reset() {
      this.inputs.forEach(input => input.reset())
    },
    resetValidation() {
      this.shouldValidate = false
      this.validated = false
      this.inputs.forEach(input => input.resetValidation())
    },
    initValidation() {
      const initialValidation = this.fullOptions.initialValidation
      if (initialValidation === 'all' && !this.modelRoot) {
        this.validate(true)
      }
      if (initialValidation === 'defined' && this.initiallyDefined && !this.isObjectContainer) {
        this.validate(true)
      }
    },
    fastForwardEvent(eventName, data) {
      // emit an event to the top of the vjsf instances tree exactly as it is
      if (this.fullKey === 'root') this.$emit(eventName, data)
      else this.form.fastForwardEvent(eventName, data)
    },
    getExprNode() {
      const node = {
        value: this.value,
        key: this.modelKey,
        fullKey: this.fullKey,
        schema: this.schema
      }
      if (this.form && this.form.getExprNode) node.parent = this.form.getExprNode()
      return node
    }
  }
}
