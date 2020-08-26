import { examples } from '../doc/examples'
const utils = require('./utils')

describe('Examples used as simple test cases', () => {
  examples.filter(example => !example.skip).forEach(example => {
    test(example.title, () => {
      const wrapper = utils.getExampleWrapper(example)
      // wait a little bit for optional asynchronous calls
      return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
        expect(wrapper.element).toMatchSnapshot()
        if (example.test) example.test(wrapper)
      })
    })
  })
})
