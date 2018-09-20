import { decodeString } from '../../../aid/encrypt'

async function decryptString (ciphertext) {
  const plaintextBytes = await this.decryptBytes(ciphertext)
  const plaintextString = decodeString(plaintextBytes)
  return plaintextString
}

export default decryptString
