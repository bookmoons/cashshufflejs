import { base64ToBytes } from '../../../aid/convert'
import { cryptDecodeString } from '../../../aid/code'

async function decryptString (ciphertext) {
  const ciphertextBytes = base64ToBytes(ciphertext)
  const plaintextBytes = await this.decryptBytes(ciphertextBytes)
  const plaintextString = cryptDecodeString(plaintextBytes)
  return plaintextString
}

export default decryptString
