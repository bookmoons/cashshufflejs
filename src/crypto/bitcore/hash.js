import crypto from 'crypto'
import { nodeBufferToBytes } from '../../aid/convert'

async function hash (text) {
  const hasher = crypto.createHash('sha224')
  hasher.update(text)
  const digestBuffer = hasher.digest()
  const digestBinary = nodeBufferToBytes(digestBuffer).buffer
  return digestBinary
}

export default hash
