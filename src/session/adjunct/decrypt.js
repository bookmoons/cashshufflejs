import { ValueError } from '/error'
import { bytesToHex } from '/aid/convert'

/**
 * Decrypt output list.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {Array<Uint8Array>} encryptedOutputList - List of output address
 *     layered encryptions. Not modified. Items not modified.
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 *
 * @return {Array<Uint8Array>} Decrypted output list in same order.
 *
 * @throws {ValueError} If any item decryption fails.
 *     Message starts `'decryption failure'`.
 * @throws {ValueError} If output list contains duplicates.
 *     Message `'output list duplicates'`.
 */
async function decryptOutputList (encryptedOutputList, crypto) {
  const decryptedOutputList = []
  const decryptedItems = new Set()
  for (const encryptedItem of encryptedOutputList) {
    let decryptedItem
    try {
      decryptedItem = await crypto.decryptBytes(encryptedItem)
    } catch (e) {
      // Decryption failure
      // TODO: Improve specificity of this detection.
      const info = { encryptedItem }
      throw new ValueError({ cause: e, info }, 'decryption failure')
    }
    const decryptedItemString = bytesToHex(decryptedItem)
    if (decryptedItems.has(decryptedItemString)) {
      // Duplicate item
      const info = {
        encryptedOutputList,
        decryptedOutputList,
        duplicate: decryptedItem
      }
      throw new ValueError({ info }, 'output list duplicates')
    }
    decryptedItems.add(decryptedItemString)
    decryptedOutputList.push(decryptedItem)
  }
  return decryptedOutputList
}

export default decryptOutputList
