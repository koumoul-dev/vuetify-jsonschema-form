import { Parser } from 'expr-eval'

export default new Parser({
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
