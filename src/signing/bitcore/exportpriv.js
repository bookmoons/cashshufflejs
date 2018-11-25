import { MissingValueError } from '/error'
import privs from './privs'

async function exportPrivateKey () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const privateKey = priv.keyPair.privateKey
  const privateKeyString = privateKey.toString()
  return privateKeyString
}

export default exportPrivateKey
