import bitcore from 'bitcore-lib-cash'
import { bytesToBase64 } from '../../../aid/convert'
import { encodeString } from '../../../aid/encrypt'

const mainnet = bitcore.Networks.mainnet

async function encryptString (plaintext, recipient, network = mainnet) {
  const plaintextBytes = encodeString(plaintext)
  const ciphertext = await this.encryptBytes(
    plaintextBytes,
    recipient,
    network
  )
  const ciphertextBase64 = bytesToBase64(ciphertext)
  return ciphertextBase64
}

export default encryptString
