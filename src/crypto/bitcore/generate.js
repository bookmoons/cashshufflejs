import bitcore from 'bitcore-lib'
import privs from './privs'

const mainnet = bitcore.Networks.mainnet

async function generateKeyPair (network = mainnet) {
  const priv = privs.get(this)
  const privateKey = new bitcore.PrivateKey(null, network)
  const publicKey = new bitcore.PublicKey(privateKey)
  const keyPair = {
    privateKey,
    publicKey
  }
  priv.keyPair = keyPair
}

export default generateKeyPair
