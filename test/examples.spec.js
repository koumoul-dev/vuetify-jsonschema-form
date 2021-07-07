import { examples } from '../doc/examples'
const utils = require('./utils')

describe('Examples used as simple test cases', () => {
  for (const examplesGroup of examples) {
    for (const example of examplesGroup.examples) {
      if (example.skip) continue
      test(example.title, () => {
        const { wrapper, modelWrapper, events } = utils.getExampleWrapper(example)
        // wait a little bit for optional asynchronous calls
        return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
          expect(wrapper.element).toMatchSnapshot()
          if (example.test) example.test(wrapper, modelWrapper, events)
        })
      })
    }
  }
})
