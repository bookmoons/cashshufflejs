import Hasher from 'jssha'

function hash (text) {
  const hasher = new Hasher('SHA-224', 'TEXT')
  hasher.update(text)
  const hash = hasher.getHash('ARRAYBUFFER')
  return hash
}

export default hash
