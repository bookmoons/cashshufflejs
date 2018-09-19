import { MissingValueError } from '../../../error'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import {
  base64ToBytes,
  bytesToNodeBuffer,
  nodeBufferToBytes
} from '../../../aid/convert'
import { decodeString } from '../../../aid/encrypt'
import privs from '../privs'

async function decryptString (cryptogram) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const decryptor = new ECIES()
  decryptor.privateKey(priv.keyPair.privateKey)
  const cryptogramBytes = base64ToBytes(cryptogram)
  const cryptogramNodeBuffer = bytesToNodeBuffer(cryptogramBytes)
  const messageNodeBuffer = decryptor.decrypt(cryptogramNodeBuffer)
  const messageBytes = nodeBufferToBytes(messageNodeBuffer)
  const messageString = decodeString(messageBytes)
  return messageString
}

export default decryptString
