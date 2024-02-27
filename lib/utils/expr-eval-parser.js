import { Parser } from 'expr-eval'

const parser = new Parser({
  //  Useless in our use case
  //  mathematical
  add: true,
  concatenate: true,
  divide: true,
  factorial: true,
  multiply: true,
  power: true,
  remainder: true,
  subtract: true,

  //  programmatic, allowed so that function definition is possible
  assignment: true,

  //  logical
  logical: true,
  comparison: true,
  in: true
})

parser.functions.concatString = function () {
  let result = ''
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i]
  }
  return result
}

parser.functions.toUpperCase = function (arg) {
  if (typeof arg !== 'string') return arg
  return arg.toUpperCase()
}

parser.functions.toLowerCase = function (arg) {
  if (typeof arg !== 'string') return arg
  return arg.toLowerCase()
}

parser.functions.trim = function (arg) {
  if (typeof arg !== 'string') return arg
  return arg.trim()
}

export default parser
