import { Parser } from 'expr-eval'

export default {
    name: "Expression",
    data() {
        return {
            parser: new Parser({

                //Useless in our use case
                //mathematical
                add: false,
                concatenate: false,
                divide: false,
                factorial: false,
                multiply: false,
                power: false,
                remainer: false,
                substract: false,
                //programatic
                assignement: false,

                //logical
                logical: true,
                comparison: true,
                in: true,
            })
        };
    },
    methods: {
        /**
         * @param {String} expression - like : a == 2
         * @param {Object} context - {a : 2}, basically is the v-model
         * @return {Boolean} result of evaluation of the expression 
         */
        evaluate(expression, context) {
            console.warn(expression);
            return this.parser.evaluate(expression, context);
        },

        /** 
         * @param {String} exp - like: a == 2
         * @return {Boolean} - true if exp is a valid Rich Expression, is not false
        */
        isRichExpr(exp) {
            try {
                this.parser.parse(exp);
            } catch (error) {
                return false;
            }
            return true;

        }

    }
}