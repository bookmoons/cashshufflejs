import { MissingValueError } from '../../error'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import privs from './privs'

async function decrypt (cryptogram) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const decryptor = new ECIES()
  const cryptogramBuffer = Buffer.from(cryptogram, 'base64')
  decryptor.privateKey(priv.keyPair.privateKey)
  const messageBuffer = decryptor.decrypt(cryptogramBuffer)
  const messageString = messageBuffer.toString('utf8')
  return messageString
}

export default decrypt
