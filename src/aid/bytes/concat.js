import bytesToLengthSum from '../reduce/bytes/length/sum'

/**
 * Concatenate list of `Uint8Array`s.
 *
 * @param {Iterable<Uint8Array>} components - `Uint8Array`s to concatenate.
 *
 * @return {Uint8Array} New `Uint8Array` containing copy of bytes in
 *     `components` in provided order.
 */
function concatenateBytes (components) {
  const componentsArray = [ ...components ]
  const length = componentsArray.reduce(bytesToLengthSum, 0)
  const bytes = new Uint8Array(length)
  let index = 0
  for (const component of componentsArray) {
    if (!component.length) continue
    bytes.set(component, index)
    index += component.length
  }
  return bytes
}

export default concatenateBytes
