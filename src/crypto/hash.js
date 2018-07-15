import Hasher from 'jssha'

/**
 * Hash a string with SHA-224.
 * @memberof module:cashshufflejs/crypto.Crypto
 *
 * @param {string} text - Text to hash.
 *
 * @return {ArrayBuffer} SHA-224 hash of the text.
 */
function hash (text) {
  const hasher = new Hasher('SHA-224', 'TEXT')
  hasher.update(text)
  const hash = hasher.getHash('ARRAYBUFFER')
  return hash
}

export default hash
