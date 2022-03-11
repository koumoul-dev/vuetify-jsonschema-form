export default class Parser {
  constructor(ConcreteParser) {
    this.parser = new ConcreteParser({ //  Useless in our use case
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
  }

  /**
       * @param {String} expression - like : a == 2
       * @param {Object} context - {a : 2}, basically is the v-model
       * @return {Boolean} result of evaluation of the expression
  */
  evaluate(expression, context) {
    if (this.parser) {
      return this.parser.evaluate(expression, context)
    } else {
      throw new Error('expr-eval package is required to use exprEval as evalMethod')
    }
  }
}
