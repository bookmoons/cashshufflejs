import { ValueError } from '../../error'

/**
 * Decrypt output list.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {Array<Base64>} encryptedOutputList - List of output address
 *     layered encryptions.
 * @param {Crypto} crypto - Message encryptor. Assumed ready for use.
 *
 * @return {Array<string>} Decrypted output list in same order.
 *
 * @throws {ValueError} If any item decryption fails.
 *     Message `'decryption failure'`.
 * @throws {ValueError} If output list contains duplicates.
 *     Message `'output list duplicates'`.
 */
async function decryptOutputList (encryptedOutputList, crypto) {
  const decryptedOutputList = []
  const decryptedItems = new Set()
  for (const encryptedItem of encryptedOutputList) {
    let decryptedItem
    try {
      decryptedItem = await crypto.decrypt(encryptedItem)
    } catch (e) {
      // Decryption failure
      // TODO: Improve specificity of this detection.
      const info = { encryptedItem }
      throw new ValueError({ info }, 'decryption failure')
    }
    if (decryptedItems.has(decryptedItem)) {
      // Duplicate item
      const info = {
        encryptedOutputList,
        decryptedOutputList,
        duplicate: decryptedItem
      }
      throw new ValueError({ info }, 'output list duplicates')
    }
    decryptedItems.add(decryptedItem)
    decryptedOutputList.push(decryptedItem)
  }
  return decryptedOutputList
}

export default decryptOutputList
