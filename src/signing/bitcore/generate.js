import bitcore from 'bitcore-lib-cash'
import privs from './privs'

const mainnet = bitcore.Networks.mainnet

async function generateKeyPair (network = mainnet) {
  const priv = privs.get(this)
  const privateKey = new bitcore.PrivateKey(null, network)
  const publicKey = new bitcore.PublicKey(privateKey, { network })
  const address = new bitcore.Address(publicKey, network)
  const keyPair = {
    privateKey,
    publicKey,
    address
  }
  priv.keyPair = keyPair
}

export default generateKeyPair
