import { hexToBytes } from '/aid/convert'
import { MissingValueError } from '/error'
import privs from './privs'

async function exportPublicKey () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const publicKey = priv.keyPair.publicKey
  const publicKeyHex = publicKey.toString()
  const publicKeyBytes = hexToBytes(publicKeyHex)
  return publicKeyBytes
}

export default exportPublicKey
