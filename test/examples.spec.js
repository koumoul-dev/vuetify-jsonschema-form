import { examples } from '../doc/examples'
const utils = require('./utils')

describe('Examples used as simple test cases', () => {
  examples.filter(example => !example.skip).forEach(example => {
    test(example.title, () => {
      const wrapper = utils.getExampleWrapper(example)
      expect(wrapper.element).toMatchSnapshot()
      if (example.test) example.test(wrapper)
    })
  })
})
