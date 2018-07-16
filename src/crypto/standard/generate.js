import bitcoin from 'bitcoinjs-lib'
import privs from './privs'

function generateKeyPair () {
  const priv = privs.get(this)
  const keyPair = bitcoin.ECPair.makeRandom()
  priv.keyPair = keyPair
}

export default generateKeyPair
