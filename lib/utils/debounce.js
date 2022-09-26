export default function (func, timeout = 1000) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    if (!args[0] || !args[0].clear) {
      timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
  }
}
