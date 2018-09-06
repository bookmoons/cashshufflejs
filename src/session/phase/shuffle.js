import shuffleList from 'crypto-secure-shuffle'
import Signing from '../../signing/bitcore'
import { ValueError } from '../../error'
import { defaultAttempts, defaultTimeout } from '../default'
import { outputListDelimiter } from '../value'

/**
 * @typedef {object} ShuffleParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {boolean} firstParticipant - Whether own client is first
 *     in shuffle order.
 * @prop {boolean} lastParticipant - Whether own client is last
 *     in shuffle order.
 * @prop {HexString} priorParticipant - Signing public key of prior
 *     participant. `null` for none.
 * @prop {HexString} nextParticipant - Signing public key of next participant.
 *     `null` for none.
 * @prop {Iterable<HexString>} encryptionPublicKeys - Subsequent participant
 *     encryption public keys in shuffle order. Empty `Iterable` for none.
 * @prop {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {Receiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 */

/**
 * @typedef {object} ShuffleReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {Signing} outputKeyPair - Own output key pair.
 */

/**
 * @memberof module:cashshuffle/session.Session
 *
 * @param {ShuffleParams} params
 *
 * @return {ShuffleReturn}
 *
 * @throws {ValueError} If any output list item decryption fails.
 *     Message `'decryption failure'`.
 * @throws {ValueError} If output list contains duplicates.
 *     Message `'output list duplicates'`.
 */
async function shuffle ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  participantNumber,
  signingKeyPair,
  firstParticipant,
  lastParticipant,
  priorParticipant,
  nextParticipant,
  encryptionPublicKeys,
  crypto,
  outchan,
  receiver,
  discarder = null
}) {
  const outputList = []
  const reversedEncryptionPublicKeys = [ ...encryptionPublicKeys ].reverse()

  /* Generate output key pair. */
  const outputKeyPair = new Signing()
  await outputKeyPair.generateKeyPair()
  const outputAddress = await outputKeyPair.address()

  if (lastParticipant) {
    // Last participant does nothing. Handles output list in next phase.

    /* Return output key pair. */
    return { outputKeyPair }
  }

  // Prepare encrypted output address
  const encryptedOutputAddress = await this.encryptLayered(
    crypto,
    outputAddress,
    reversedEncryptionPublicKeys
  )

  if (firstParticipant) {
    /* Construct initial output list. */
    outputList.push(encryptedOutputAddress)
  } else { // Inner participant
    /* Gather output list message from prior participant. */
    const priorOutputListPacket = await this.gatherOutputList({
      attempts,
      timeout,
      priorParticipant,
      receiver,
      discarder
    })

    /* Extract encoded output list. */
    const encodedOutputList = priorOutputListPacket.message.str

    /* Deserialize encrypted output list. */
    const encryptedOutputList = encodedOutputList.split(outputListDelimiter)

    /* Decrypt output list. */
    const decryptedOutputList = new Set()
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
      if (decryptedOutputList.has(decryptedItem)) {
        // Duplicate item
        const info = {
          encryptedOutputList,
          decryptedOutputList,
          duplicate: decryptedItem
        }
        throw new ValueError({ info }, 'output list duplicates')
      }
      decryptedOutputList.add(decryptedItem)
    }

    /* Extend output list. */
    const extendedOutputList = new Set(decryptedOutputList)
    extendedOutputList.add(encryptedOutputAddress)

    /* Shuffle output list. */
    const shuffledOutputList = [ ...extendedOutputList ]
    await shuffleList(shuffledOutputList)

    /* Stage new output list. */
    outputList.push(...shuffledOutputList)
  }

  /* Unicast output list. */
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const ownPacket = await this.messageOutputList({
    protocol,
    signingPublicKey,
    sessionId,
    participantNumber,
    outputList,
    nextParticipant
  })
  const signature = await this.sign(
    signingKeyPair,
    ownPacket,
    protocol.Packet
  )
  const ownSignedPacket = await this.affix(
    ownPacket,
    signature,
    protocol
  )
  const ownPackage = await this.packageSignedPacket(
    protocol,
    ownSignedPacket
  )
  await outchan.send(ownPackage)

  /* Return output key pair. */
  return { outputKeyPair }
}

export default shuffle
