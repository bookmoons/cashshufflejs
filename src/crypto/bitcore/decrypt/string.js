import { MissingValueError } from '../../../error'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import {
  base64ToBytes,
  bytesToNodeBuffer,
  nodeBufferToBytes
} from '../../../aid/convert'
import { decodeString } from '../../../aid/encrypt'
import privs from '../privs'

async function decryptString (ciphertext) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const decryptor = new ECIES()
  decryptor.privateKey(priv.keyPair.privateKey)
  const ciphertextBytes = base64ToBytes(ciphertext)
  const ciphertextNodeBuffer = bytesToNodeBuffer(ciphertextBytes)
  const plaintextNodeBuffer = decryptor.decrypt(ciphertextNodeBuffer)
  const plaintextBytes = nodeBufferToBytes(plaintextNodeBuffer)
  const plaintextString = decodeString(plaintextBytes)
  return plaintextString
}

export default decryptString
