import Message from '@bookmoons/bitcore-message-cash'
import { MissingValueError } from '../../error'
import { base64ToBytes } from '../../aid/convert'
import privs from './privs'

async function sign (message) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const signer = new Message(message)
  const signatureBase64 = signer.sign(priv.keyPair.privateKey)
  const signature = base64ToBytes(signatureBase64)
  return signature
}

export default sign
