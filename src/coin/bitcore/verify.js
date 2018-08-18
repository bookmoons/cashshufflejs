import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'

async function verifySignature (signature, message, publicKeyString) {
  const publicKey = new bitcore.PublicKey(publicKeyString)
  const address = publicKey.toAddress()
  const messageObject = new Message(message)
  const valid = messageObject.verify(address, signature)
  return valid
}

export default verifySignature
