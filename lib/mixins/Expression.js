import { Parser } from 'expr-eval'

export default {
  name: 'Expression',
  data() {
    return {
      parser: null
    }
  },
  mounted() {
    import('expr-eval').then(({ Parser }) => {
      this.parser = new Parser({

        //  Useless in our use case
        //  mathematical
        add: false,
        concatenate: false,
        divide: false,
        factorial: false,
        multiply: false,
        power: false,
        remainer: false,
        substract: false,
        //  programatic
        assignement: false,

        //  logical
        logical: true,
        comparison: true,
        in: true
      })
    })
  },
  methods: {
    /**
     * @param {String} expression - like : a == 2
     * @param {Object} context - {a : 2}, basically is the v-model
     * @return {Boolean} result of evaluation of the expression
     */
    evaluate(expression, context) {
      return this.parser.evaluate(expression, context)
    }
  }
}
