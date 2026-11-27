// CodeMirror (inside EasyMDE) measures text through ranges, jsdom does not implement their layout methods
// (no Range at all in the tests that run in the node environment)
if (typeof Range !== 'undefined') {
  const emptyRect = () => ({ x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0, toJSON () { return this } })
  if (!Range.prototype.getBoundingClientRect) Range.prototype.getBoundingClientRect = emptyRect
  // @ts-ignore
  if (!Range.prototype.getClientRects) Range.prototype.getClientRects = () => []
}
