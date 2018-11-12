import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'
import { bytesToBase64 } from '../../aid/convert'

const mainnet = bitcore.Networks.mainnet

async function verifySignature (
  signature,
  message,
  publicKeyString,
  network = mainnet
) {
  const publicKey = new bitcore.PublicKey(publicKeyString, { network })
  const address = publicKey.toAddress(network)
  const verifier = new Message(message)
  const signatureBase64 = bytesToBase64(signature)
  const valid = verifier.verify(address, signatureBase64)
  return valid
}

export default verifySignature
