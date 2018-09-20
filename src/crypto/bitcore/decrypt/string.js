import { base64ToBytes } from '../../../aid/convert'
import { decodeString } from '../../../aid/encrypt'

async function decryptString (ciphertext) {
  const ciphertextBytes = base64ToBytes(ciphertext)
  const plaintextBytes = await this.decryptBytes(ciphertextBytes)
  const plaintextString = decodeString(plaintextBytes)
  return plaintextString
}

export default decryptString
