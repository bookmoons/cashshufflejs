import bitcore from 'bitcore-lib-cash'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import {
  bytesToBase64,
  bytesToNodeBuffer,
  nodeBufferToBytes,
  stringToUtf8
} from '../../util'

const mainnet = bitcore.Networks.mainnet

async function encrypt (message, recipient, network = mainnet) {
  const ephemeralPrivateKey = new bitcore.PrivateKey(null, network)
  const encryptor = new ECIES()
  encryptor.privateKey(ephemeralPrivateKey)
  const recipientPublicKey = new bitcore.PublicKey(recipient, { network })
  encryptor.publicKey(recipientPublicKey)
  const messageBytes = stringToUtf8(message)
  const messageNodeBuffer = bytesToNodeBuffer(messageBytes)
  const cryptogramNodeBuffer = encryptor.encrypt(messageNodeBuffer)
  const cryptogramBytes = nodeBufferToBytes(cryptogramNodeBuffer)
  const cryptogramBase64 = bytesToBase64(cryptogramBytes)
  return cryptogramBase64
}

export default encrypt
