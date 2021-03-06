import { MissingValueError } from '/error'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import { bytesToNodeBuffer, nodeBufferToBytes } from '/aid/convert'
import privs from './privs'

async function decrypt (ciphertext) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const ciphertextNodeBuffer = bytesToNodeBuffer(ciphertext)
  const plaintextNodeBuffer = (function performDecryption () {
    const decryptor = new ECIES()
    decryptor.privateKey(priv.keyPair.privateKey)
    return decryptor.decrypt(ciphertextNodeBuffer)
  })()
  const plaintextBytes = nodeBufferToBytes(plaintextNodeBuffer)
  return plaintextBytes
}

export default decrypt
