import { MissingValueError } from '/error'
import privs from './privs'

async function exportPublicKey () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const publicKey = priv.keyPair.publicKey
  const publicKeyString = publicKey.toString()
  return publicKeyString
}

export default exportPublicKey
