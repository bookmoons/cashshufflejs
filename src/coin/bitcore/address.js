import bitcore from 'bitcore-lib-cash'

const mainnet = bitcore.Networks.mainnet

async function address (publicKeyString, network = mainnet) {
  const publicKey = new bitcore.PublicKey(publicKeyString, { network })
  const address = publicKey.toAddress()
  const addressString = address.toCashAddress()
  return addressString
}

export default address
