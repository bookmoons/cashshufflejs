import Message from '@bookmoons/bitcore-message-cash'
import { MissingValueError } from '../../error'
import privs from './privs'

async function sign (message) {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const signer = new Message(message)
  const privateKey = priv.keyPair.privateKey
  const signatureBase64 = signer.sign(privateKey)
  return signatureBase64
}

export default sign
