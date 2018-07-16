import { MissingValueError } from '../../error'
import privs from './privs'

function exportPublicKey () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const publicKeyBuffer = priv.keyPair.getPublicKeyBuffer()
  const publicKeyString = publicKeyBuffer.toString('hex')
  return publicKeyString
}

export default exportPublicKey
