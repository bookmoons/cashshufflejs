import bitcore from 'bitcore-lib-cash'
import ECIES from '@bookmoons/bitcore-ecies-cash'
import { bytesToNodeBuffer, nodeBufferToBytes } from '/aid/convert'

const mainnet = bitcore.Networks.mainnet

async function encrypt (plaintext, recipient, network = mainnet) {
  const plaintextNodeBuffer = bytesToNodeBuffer(plaintext)
  const ciphertextNodeBuffer = (function performEncryption () {
    const encryptor = new ECIES()
    const recipientPublicKey = new bitcore.PublicKey(recipient, { network })
    encryptor.publicKey(recipientPublicKey)
    ;(function generateEphemeralKeyPair () {
      const ephemeralPrivateKey = new bitcore.PrivateKey(null, network)
      encryptor.privateKey(ephemeralPrivateKey)
    })()
    return encryptor.encrypt(plaintextNodeBuffer)
  })()
  const ciphertext = nodeBufferToBytes(ciphertextNodeBuffer)
  return ciphertext
}

export default encrypt
