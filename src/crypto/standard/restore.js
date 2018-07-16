import wif from 'wif'
import bitcoin from 'bitcoinjs-lib'
import privs from './privs'

const mainnet = 0x80

function restorePrivateKey (
  privateKeyString, compressed = true, version = mainnet
) {
  const priv = privs.get(this)
  const privateKeyBuffer = Buffer.from(privateKeyString, 'hex')
  const privateKeyWif = wif.encode(version, privateKeyBuffer, compressed)
  const keyPair = bitcoin.ECPair.fromWIF(privateKeyWif)
  priv.keyPair = keyPair
}

export default restorePrivateKey
