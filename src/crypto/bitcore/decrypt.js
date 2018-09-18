import { MissingValueError } from '../../error'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import { nodeBufferToBytes } from '../../aid'
import {
  base64ToBytes,
  bytesToNodeBuffer,
  utf8ToString
} from '../../aid/convert'
import privs from './privs'

async function decrypt (cryptogram) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const decryptor = new ECIES()
  decryptor.privateKey(priv.keyPair.privateKey)
  const cryptogramBytes = base64ToBytes(cryptogram)
  const cryptogramNodeBuffer = bytesToNodeBuffer(cryptogramBytes)
  const messageNodeBuffer = decryptor.decrypt(cryptogramNodeBuffer)
  const messageBytes = nodeBufferToBytes(messageNodeBuffer)
  const messageString = utf8ToString(messageBytes)
  return messageString
}

export default decrypt
