import bitcore from 'bitcore-lib-cash'
import { bytesToHex } from '/aid/convert'
import privs from './privs'

const mainnet = bitcore.Networks.mainnet

async function restoreKeyPair (privateKeyBytes, network = mainnet) {
  const priv = privs.get(this)
  const privateKeyHex = bytesToHex(privateKeyBytes)
  const privateKey = new bitcore.PrivateKey(privateKeyHex, network)
  const publicKey = new bitcore.PublicKey(privateKey, { network })
  const address = new bitcore.Address(publicKey, network)
  const keyPair = {
    privateKey,
    publicKey,
    address
  }
  priv.keyPair = keyPair
}

export default restoreKeyPair
