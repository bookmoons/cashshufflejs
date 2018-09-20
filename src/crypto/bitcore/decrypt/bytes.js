import { MissingValueError } from '../../../error'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import {
  base64ToBytes,
  bytesToNodeBuffer,
  nodeBufferToBytes
} from '../../../aid/convert'
import privs from '../privs'

async function decryptBytes (ciphertext) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const ciphertextBytes = base64ToBytes(ciphertext)
  const ciphertextNodeBuffer = bytesToNodeBuffer(ciphertextBytes)
  const plaintextNodeBuffer = (function performDecryption () {
    const decryptor = new ECIES()
    decryptor.privateKey(priv.keyPair.privateKey)
    return decryptor.decrypt(ciphertextNodeBuffer)
  })()
  const plaintextBytes = nodeBufferToBytes(plaintextNodeBuffer)
  return plaintextBytes
}

export default decryptBytes
