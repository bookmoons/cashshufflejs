import crypto from 'crypto'
import bufferToBytes from '../../util/tobytes/buffer'

async function hash (text) {
  const hasher = crypto.createHash('sha224')
  hasher.update(text)
  const digestBuffer = hasher.digest()
  const digestBinary = bufferToBytes(digestBuffer).buffer
  return digestBinary
}

export default hash
