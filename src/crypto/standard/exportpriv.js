import wif from 'wif'
import { MissingValueError } from '../../error'
import privs from './privs'

function exportPrivateKey () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const privateKeyWif = priv.keyPair.toWIF()
  const { privateKey: privateKeyBuffer } = wif.decode(privateKeyWif)
  const privateKeyString = privateKeyBuffer.toString('hex')
  return privateKeyString
}

export default exportPrivateKey
