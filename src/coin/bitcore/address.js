import bitcore from 'bitcore-lib-cash'

async function address (publicKeyString) {
  const publicKey = new bitcore.PublicKey(publicKeyString)
  const address = publicKey.toAddress()
  const addressString = address.toString()
  return addressString
}

export default address
