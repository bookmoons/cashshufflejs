import bitcore from 'bitcore-lib-cash'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import { bytesToBase64, nodeBufferToBytes } from '../../util'

const mainnet = bitcore.Networks.mainnet

async function encrypt (message, recipient, network = mainnet) {
  const ephemeralPrivateKey = new bitcore.PrivateKey(null, network)
  const encryptor = new ECIES()
  encryptor.privateKey(ephemeralPrivateKey)
  const recipientPublicKey = new bitcore.PublicKey(recipient, { network })
  encryptor.publicKey(recipientPublicKey)
  const cryptogramNodeBuffer = encryptor.encrypt(message)
  const cryptogramBytes = nodeBufferToBytes(cryptogramNodeBuffer)
  const cryptogramBase64 = bytesToBase64(cryptogramBytes)
  return cryptogramBase64
}

export default encrypt
