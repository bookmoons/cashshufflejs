import bitcore from 'bitcore-lib-cash'
import { encodeString } from '../../../aid/encrypt'

const mainnet = bitcore.Networks.mainnet

async function encryptString (plaintext, recipient, network = mainnet) {
  const plaintextBytes = encodeString(plaintext)
  const ciphertext = await this.encryptBytes(
    plaintextBytes,
    recipient,
    network
  )
  return ciphertext
}

export default encryptString
