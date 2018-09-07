import shuffleList from 'crypto-secure-shuffle'
import { ValueError } from '../../error'
import { defaultAttempts, defaultTimeout } from '../default'
import { outputListDelimiter } from '../value'

/**
 * @typedef {object} OutputParams
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
 * @prop {boolean} last - Whether own client is last in shuffle order.
 * @prop {HexString} priorParticipant - Signing public key of prior
 *     participant.
 * @prop {HexString} lastParticipant - Signing public key of last participant.
 * @prop {CashAddr} outputAddress - Own output address.
 * @prop {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=null] - Receiver to discard messages to.
 */

/**
 * @typedef {object} OutputReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {Array<CashAddr>} outputList - Final output list.
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
  participantNumber,
  signingKeyPair,
  last,
  priorParticipant,
  lastParticipant,
  outputAddress,
  crypto,
  outchan,
  receiver,
  discarder = null
}) {
  if (last) {
    // Last participant produces final output list

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
      outputAddress
    ]

    /* Shuffle output list. */
    const shuffledOutputList = [ ...extendedOutputList ]
    await shuffleList(shuffledOutputList)

    /* Broadcast final output list. */
    const signingPublicKey = await signingKeyPair.exportPublicKey()
    const ownPacket = await this.messageFinalOutput({
      protocol,
      signingPublicKey,
      sessionId,
      participantNumber,
      outputList: shuffledOutputList
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

    /* Return final output list. */
    return { outputList: shuffledOutputList }
  } else {
    // Nonlast participant verifies own output address in final output list

    /** Gather final output list message from last participant. */
    const finalOutputListPacket = await this.gatherFinalOutput({
      attempts,
      timeout,
      lastParticipant,
      receiver,
      discarder
    })

    /* Extract encoded output list. */
    const encodedOutputList = finalOutputListPacket.message.str

    /* Deserialize output list. */
    const outputList = encodedOutputList.split(outputListDelimiter)

    /* Verify own output address. */
    if (!outputList.includes(outputAddress)) {
      throw new ValueError(
        { info: { outputList, outputAddress } },
        'output missing'
      )
    }

    /* Return final output list. */
    return { outputList }
  }
}

export default broadcastOutput
