import bitcoin from 'bitcoinjs-lib'
import privs from './privs'

const mainnet = bitcoin.networks.bitcoin

function generateKeyPair (network = mainnet) {
  const priv = privs.get(this)
  const keyPair = bitcoin.ECPair.makeRandom({
    network
  })
  priv.keyPair = keyPair
}

export default generateKeyPair
