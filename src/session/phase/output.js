import shuffleList from 'crypto-secure-shuffle'
import { ValueError } from '../../error'
import PrefixLogchan from '../../logchan/prefix'
import { base64ToBytes } from '../../aid/convert'
import { defaultAttempts, defaultTimeout } from '../default'

/**
 * @typedef {object} OutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {number} [attempts=<default>] - Maximum gather attempts.
 *     Positive integer.
 * @prop {number} [timeout=<default>] - Network operation timeout
 *     in milliseconds.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Signing} signingKeyPair - Shuffler signing key pair.
 *     Assumed ready for use.
 * @prop {boolean} last - Whether own client is last in shuffle order.
 * @prop {number} shufflersCount - Count of shufflers.
 * @prop {number} precedingShufflersCount - Count of preceding shufflers.
 * @prop {HexString} priorShuffler - Signing public key of prior
 *     shuffler.
 * @prop {HexString} lastShuffler - Signing public key of last shuffler.
 * @prop {CashAddress} outputAddress - Own output address.
 * @prop {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {PhaseReceiver} priorReceiver - Prior phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {Logchan} [log=] - Logging channel.
 */

/**
 * @typedef {object} OutputReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {Array<Address>} outputList - Final output list.
 */

/**
 * @memberof module:cashshuffle/session.Session
 *
 * @param {OutputParams} params
 *
 * @return {OutputReturn}
 *
 * @throws {ValueError} If any output list item decryption fails.
 *     Message `'decryption failure'`.
 * @throws {ValueError} If output list contains duplicates.
 *     Message `'output list duplicates'`.
 * @throws {ValueError} If own output address not in final output list.
 *     Message `'output missing'`.
 */
async function broadcastOutput ({
  protocol,
  attempts = defaultAttempts,
  timeout = defaultTimeout,
  sessionId,
  poolNumber,
  signingKeyPair,
  last,
  shufflersCount,
  precedingShufflersCount,
  priorShuffler,
  lastShuffler,
  outputAddress,
  crypto,
  outchan,
  receiver,
  priorReceiver,
  discarder = null,
  log = null
}) {
  /* Prefix log messages. */
  log = log ? new PrefixLogchan('P3: ', log) : null

  if (last) {
    // Last shuffler produces final output list

    /* Gather output list messages from prior shuffler. */
    const priorOutputListPackets = await this.gatherShuffleOutput({
      attempts,
      timeout,
      priorShuffler,
      precedingShufflersCount,
      receiver: priorReceiver,
      discarder
    })
    if (log) await log.send('Received encrypted output list')

    /* Extract output list items. */
    const encryptedOutputList = priorOutputListPackets.map(
      function iteratePriorOutputListPackets (packet) {
        return packet.message.str
      }
    )

    /* Decrypt output list. */
    const decryptedOutputList = await this.decryptOutputList(
      encryptedOutputList,
      crypto
    )

    /* Extend output list. */
    const extendedOutputList = [
      ...decryptedOutputList,
      outputAddress
    ]
    if (log) await log.send('Added own output address to output list')

    /* Shuffle output list. */
    const shuffledOutputList = [ ...extendedOutputList ]
    await shuffleList(shuffledOutputList)
    if (log) await log.send('Shuffled output list')

    /* Broadcast final output list. */
    const signingPublicKey = await signingKeyPair.exportPublicKey()
    const ownSignedPackets = []
    for (const outputAddress of shuffledOutputList) {
      const ownPacket = await this.messageFinalOutput({
        protocol,
        signingPublicKey,
        sessionId,
        poolNumber,
        outputAddress
      })
      const signatureBase64 = await this.sign(
        signingKeyPair,
        ownPacket,
        protocol.Packet
      )
      const signature = base64ToBytes(signatureBase64)
      const ownSignedPacket = await this.affix(
        ownPacket,
        signature,
        protocol
      )
      ownSignedPackets.push(ownSignedPacket)
    }
    const ownPackage = await this.packageSignedPackets(
      protocol,
      ownSignedPackets
    )
    await outchan.send(ownPackage)
    if (log) await log.send('Broadcasted final output list')

    /* Return final output list. */
    return { outputList: shuffledOutputList }
  } else {
    // Nonlast shuffler verifies own output address in final output list

    /* Gather final output list messages from last shuffler. */
    const finalOutputListPackets = await this.gatherFinalOutput({
      attempts,
      timeout,
      lastShuffler,
      shufflersCount,
      receiver,
      discarder
    })
    if (log) await log.send('Received final output list')

    /* Extract output list items. */
    const outputList = finalOutputListPackets.map(
      function iterateFinalOutputListPackets (packet) {
        return packet.message.str
      }
    )

    /* Verify own output address. */
    if (!outputList.includes(outputAddress)) {
      throw new ValueError(
        { info: { outputList, outputAddress } },
        'output missing'
      )
    }
    if (log) await log.send('Verified own output address in output list')

    /* Return final output list. */
    return { outputList }
  }
}

export default broadcastOutput
