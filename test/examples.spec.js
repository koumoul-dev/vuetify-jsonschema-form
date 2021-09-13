import 'regenerator-runtime/runtime'
import { examples } from '../doc/examples'
const utils = require('./utils')

expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    return 'input-x'
  },
  test(val) {
    return typeof val === 'string' && val.match(/input-[0-9]+/)
  }
})

expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    return 'list-x'
  },
  test(val) {
    return typeof val === 'string' && val.match(/list-[0-9]+/)
  }
})

describe('Examples used as simple test cases', () => {
  for (const examplesGroup of examples) {
    for (const example of examplesGroup.examples) {
      if (example.skip) continue
      test(example.title, () => {
        const { wrapper, modelWrapper, events } = utils.getExampleWrapper(example)
        // wait a little bit for optional asynchronous calls
        return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
          expect(wrapper.element).toMatchSnapshot()
          if (example.test) return example.test(wrapper, modelWrapper, events)
        })
      })
    }
  }
})
