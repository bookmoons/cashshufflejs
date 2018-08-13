import crypto from 'crypto'
import toArrayBuffer from '../../util/toarraybuffer'

async function hash (text) {
  const hasher = crypto.createHash('sha224')
  hasher.update(text)
  const digestBuffer = hasher.digest()
  const digestBinary = toArrayBuffer(digestBuffer)
  return digestBinary
}

export default hash
