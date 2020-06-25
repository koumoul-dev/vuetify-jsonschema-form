import { examples } from '../doc/examples'
const utils = require('./utils')

describe('Examples used as simple test cases', () => {
  examples.forEach(example => {
    test(example.title, () => {
      const wrapper = utils.getExampleWrapper(example)
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.element).toMatchSnapshot()
      if (example.test) example.test(wrapper)
    })
  })
})
