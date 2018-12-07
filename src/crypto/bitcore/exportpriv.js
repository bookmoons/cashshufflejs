import { MissingValueError } from '/error'
import { nodeBufferToBytes } from '/aid/convert'
import privs from './privs'

async function exportPrivateKey () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const privateKey = priv.keyPair.privateKey
  const privateKeyNodeBuffer = privateKey.toBuffer()
  const privateKeyBytes = nodeBufferToBytes(privateKeyNodeBuffer)
  return privateKeyBytes
}

export default exportPrivateKey
