import bitcore from 'bitcore-lib-cash'
import ECIES from '@bookmoons/bitcore-ecies-cash'

const mainnet = bitcore.Networks.mainnet

async function encrypt (message, recipient, network = mainnet) {
  const ephemeralPrivateKey = new bitcore.PrivateKey(null, network)
  const encryptor = new ECIES()
  encryptor.privateKey(ephemeralPrivateKey)
  const recipientPublicKey = new bitcore.PublicKey(recipient, { network })
  encryptor.publicKey(recipientPublicKey)
  const cryptogramBuffer = encryptor.encrypt(message)
  const cryptogramBase64 = cryptogramBuffer.toString('base64')
  return cryptogramBase64
}

export default encrypt
