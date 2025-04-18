// merge some info into the JSON layout standard examples

// import imgCropper from './img-cropper.js'
import removeAdditional from './remove-additional.js'

/** @type {Record<string, import("@json-layout/examples").JSONLayoutExample[]>} */
export const additionalExamples = {
  // slots: [codeSlots]
  // files: [imgCropper],
  _dev: [removeAdditional],
}

/** @type {Record<string, Record<string, Partial<import("@json-layout/examples").JSONLayoutExample>>>} */
export const overwrites = {
  formats: {
    markdown: {
      warning: 'This component requires the @koumoul/vjsf-markdown plugin.',
    },
  },
}
