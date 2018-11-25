import { MissingValueError } from '/error'
import privs from './privs'

async function address () {
  const priv = privs.get(this)
  if (!priv.keyPair) throw new MissingValueError('no key pair')
  const addressObject = priv.keyPair.address
  const addressString = addressObject.toCashAddress()
  return addressString
}

export default address
