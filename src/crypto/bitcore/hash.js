import crypto from 'crypto'
import { nodeBufferToBytes } from '../../aid/convert'

async function hash (text) {
  const hasher = crypto.createHash('sha224')
  hasher.update(text)
  const digestNodeBuffer = hasher.digest()
  const digest = nodeBufferToBytes(digestNodeBuffer)
  return digest
}

export default hash
