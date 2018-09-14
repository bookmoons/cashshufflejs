import shuffleList from 'crypto-secure-shuffle'
import Signing from '../../signing/bitcore'
import { defaultAttempts, defaultNetwork, defaultTimeout } from '../default'
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
 * @prop {number} poolNumber - Participant pool number.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {boolean} first - Whether own client is first in shuffle order.
 * @prop {boolean} last - Whether own client is last in shuffle order.
 * @prop {HexString} priorParticipant - Signing public key of prior
 *     participant. `null` for none.
 * @prop {HexString} nextParticipant - Signing public key of next participant.
 *     `null` for none.
 * @prop {Iterable<HexString>} encryptionPublicKeys - Subsequent participant
 *     encryption public keys in shuffle order. Empty `Iterable` for none.
 * @prop {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {Logchan} [log=] - Logging channel.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network
 *     to generate output key pair for.
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
  poolNumber,
  signingKeyPair,
  first,
  last,
  priorParticipant,
  nextParticipant,
  encryptionPublicKeys,
  crypto,
  outchan,
  receiver,
  discarder = null,
  log = null,
  network = defaultNetwork
}) {
  const outputList = []
  const reversedEncryptionPublicKeys = [ ...encryptionPublicKeys ].reverse()

  /* Generate output key pair. */
  const outputKeyPair = new Signing()
  await outputKeyPair.generateKeyPair(network)
  const outputAddress = await outputKeyPair.address()
  if (log) await log.send('Generated output address')

  if (last) {
    // Last participant does nothing. Handles output list in next phase.

    /* Return output key pair. */
    return { outputKeyPair }
  }

  // Prepare encrypted output address
  const encryptedOutputAddress = await this.encryptLayered(
    crypto,
    outputAddress,
    reversedEncryptionPublicKeys,
    network
  )

  if (first) {
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
    const decryptedOutputList = await this.decryptOutputList(
      encryptedOutputList,
      crypto
    )

    /* Extend output list. */
    const extendedOutputList = [
      ...decryptedOutputList,
      encryptedOutputAddress
    ]

    /* Shuffle output list. */
    const shuffledOutputList = [ ...extendedOutputList ]
    await shuffleList(shuffledOutputList)
    if (log) await log.send('Shuffled output list')

    /* Stage new output list. */
    outputList.push(...shuffledOutputList)
  }

  /* Unicast output list. */
  const signingPublicKey = await signingKeyPair.exportPublicKey()
  const ownPacket = await this.messageOutputList({
    protocol,
    signingPublicKey,
    sessionId,
    poolNumber,
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
  if (log) await log.send('Sent encrypted output list')

  /* Return output key pair. */
  return { outputKeyPair }
}

export default shuffle
