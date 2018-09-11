import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'

const mainnet = bitcore.Networks.mainnet

async function verifySignature (
  signature,
  message,
  publicKeyString,
  network = mainnet
) {
  const publicKey = new bitcore.PublicKey(publicKeyString, { network })
  const address = publicKey.toAddress()
  const messageObject = new Message(message)
  const valid = messageObject.verify(address, signature)
  return valid
}

export default verifySignature
