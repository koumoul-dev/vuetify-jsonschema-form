export default function (func, timeout = 1000) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args); }, timeout)
    }
}
