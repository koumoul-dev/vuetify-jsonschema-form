// merge some info into the JSON layout standard examples

import codeSlots from './code-slots.js'

/** @type {Record<string, import("@json-layout/examples").JSONLayoutExample[]>} */
export const additionalExamples = {
  slots: [codeSlots]
}

/** @type {Record<string, Record<string, Partial<import("@json-layout/examples").JSONLayoutExample>>>} */
export const overwrites = {
  formats: {
    markdown: {
      warning: 'This component requires the "@koumoul/vjsf-markdown" plugin.'
    }
  }
}
