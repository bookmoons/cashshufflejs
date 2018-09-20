import bitcore from 'bitcore-lib-cash'
import { bytesToBase64, hexToBytes } from '../../../aid/convert'
import { encodeString } from '../../../aid/encrypt'

const mainnet = bitcore.Networks.mainnet

async function encryptString (plaintext, recipient, network = mainnet) {
  const plaintextBytes = encodeString(plaintext)
  const recipientBytes = hexToBytes(recipient)
  const ciphertext = await this.encryptBytes(
    plaintextBytes,
    recipientBytes,
    network
  )
  const ciphertextBase64 = bytesToBase64(ciphertext)
  return ciphertextBase64
}

export default encryptString
