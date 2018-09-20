import bitcore from 'bitcore-lib-cash'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import {
  bytesToBase64,
  bytesToNodeBuffer,
  nodeBufferToBytes
} from '../../../aid/convert'
import { encodeString } from '../../../aid/encrypt'

const mainnet = bitcore.Networks.mainnet

async function encryptString (string, recipient, network = mainnet) {
  const ephemeralPrivateKey = new bitcore.PrivateKey(null, network)
  const encryptor = new ECIES()
  encryptor.privateKey(ephemeralPrivateKey)
  const recipientPublicKey = new bitcore.PublicKey(recipient, { network })
  encryptor.publicKey(recipientPublicKey)
  const stringBytes = encodeString(string)
  const stringNodeBuffer = bytesToNodeBuffer(stringBytes)
  const ciphertextNodeBuffer = encryptor.encrypt(stringNodeBuffer)
  const ciphertextBytes = nodeBufferToBytes(ciphertextNodeBuffer)
  const ciphertextBase64 = bytesToBase64(ciphertextBytes)
  return ciphertextBase64
}

export default encryptString
