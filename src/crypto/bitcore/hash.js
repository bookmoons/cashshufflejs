import crypto from 'crypto'
import toArrayBuffer from 'to-arraybuffer'

async function hash (text) {
  const hasher = crypto.createHash('sha224')
  hasher.update(text)
  const digestBuffer = hasher.digest()
  const digestBinaryAlias = toArrayBuffer(digestBuffer)
  const digestBinary = digestBinaryAlias.slice(0)
  return digestBinary
}

export default hash
