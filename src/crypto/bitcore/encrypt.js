import bitcore from 'bitcore-lib-cash'
import ECIES from '@bookmoons/bitcore-ecies-cash'

async function encrypt (message, recipient) {
  const ephemeralPrivateKey = new bitcore.PrivateKey()
  const encryptor = new ECIES()
  encryptor.privateKey(ephemeralPrivateKey)
  const recipientPublicKey = new bitcore.PublicKey(recipient)
  encryptor.publicKey(recipientPublicKey)
  const cryptogramBuffer = encryptor.encrypt(message)
  const cryptogramBase64 = cryptogramBuffer.toString('base64')
  return cryptogramBase64
}

export default encrypt
