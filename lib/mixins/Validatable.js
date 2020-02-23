// we bubble up and down validation instructions from the top form to the lower fields and through each container levels
// each intermediate level is aware of its validation state wich is useful in sections management, complex array, etc.

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
    }
  },
  data() {
    return {
      inputs: [],
      validated: false
    }
  },
  computed: {
    childrenErrors() {
      return this.inputs.reduce((a, input, i) => { a[input.modelKey || i] = input.hasError; return a }, {})
    },
    hasError() {
      return !!this.inputs.find(input => input.hasError)
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
      this.inputs.push(input)
    },
    unregister(input) {
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
      this.validated = false
      this.inputs.forEach(input => input.resetValidation())
    }
  }
}
