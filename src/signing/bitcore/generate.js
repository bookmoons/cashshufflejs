import bitcore from 'bitcore-lib-cash'
import privs from './privs'

const mainnet = bitcore.Networks.mainnet

async function generateKeyPair (network = mainnet) {
  const priv = privs.get(this)
  const privateKey = new bitcore.PrivateKey(null, network)
  const publicKey = new bitcore.PublicKey(privateKey)
  const address = new bitcore.Address(publicKey)
  const keyPair = {
    privateKey,
    publicKey,
    address
  }
  priv.keyPair = keyPair
}

export default generateKeyPair
