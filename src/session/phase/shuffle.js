import shuffleList from 'crypto-secure-shuffle'
import PrefixLogchan from '/logchan/prefix'
import Signing from '/signing/bitcore'
import {
  cryptDecodeBytes,
  cryptEncodeString,
  transferDecodeShuffleOutput
} from '/aid/code'
import { hexToBytes } from '/aid/convert'
import { defaultAttempts, defaultNetwork, defaultTimeout } from '../default'

/**
 * @typedef {object} ShuffleParams
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
 * @prop {boolean} first - Whether own client is first in shuffle order.
 * @prop {boolean} last - Whether own client is last in shuffle order.
 * @prop {number} precedingShufflersCount - Count of preceding shufflers.
 * @prop {HexString} priorShuffler - Signing public key of prior
 *     shuffler. `null` for none.
 * @prop {HexString} nextShuffler - Signing public key of next shuffler.
 *     `null` for none.
 * @prop {Iterable<HexString>} encryptionPublicKeys - Subsequent shuffler
 *     encryption public keys in shuffle order. Empty `Iterable` for none.
 * @prop {Crypto} crypto - Message encryptor. Assumed ready for use.
 * @prop {Outchan} outchan - Output message channel.
 * @prop {PhaseReceiver} receiver - Phase message receiver.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {Logchan} [log=] - Logging channel.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network
 *     to generate output key pair for. Not modified.
 * @prop {Address} [outputAddress=] - Own output address.
 *     Defaults to a newly generated key pair.
 */

/**
 * @typedef {object} ShuffleReturn
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {(Signing|null)} outputKeyPair - Own output key pair.
 *     `null` if using externally provided output address.
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
  precedingShufflersCount,
  priorShuffler: priorShufflerHex,
  nextShuffler: nextShufflerHex,
  encryptionPublicKeys,
  crypto,
  outchan,
  receiver,
  discarder = null,
  log = null,
  network = defaultNetwork,
  outputAddress = null
}) {
  /* Prefix log messages. */
  log = log ? new PrefixLogchan('P2: ', log) : null

  const outputList = []
  const encryptionPublicKeysBytes = [ ...encryptionPublicKeys ].map(
    function normalizeEncryptionPublicKeys (item) {
      return hexToBytes(item)
    }
  )
  const reversedEncryptionPublicKeys = encryptionPublicKeysBytes.reverse()

  /* Generate output key pair. */
  const outputKeyPair = await (async function generateOutputKeyPair () {
    if (outputAddress) return null
    const outputKeyPair = new Signing()
    await outputKeyPair.generateKeyPair(network)
    outputAddress = await outputKeyPair.address()
    if (log) await log.send('Generated output address')
    return outputKeyPair
  })()

  if (last) {
    // Last shuffler does nothing. Handles output list in next phase.

    /* Return output key pair. */
    return { outputKeyPair }
  }

  // Prepare encrypted output address
  const outputAddressEncoded = cryptEncodeString(outputAddress)
  const encryptedOutputAddress = await this.encryptLayered(
    crypto,
    outputAddressEncoded,
    reversedEncryptionPublicKeys,
    network
  )

  if (first) {
    /* Construct initial output list. */
    outputList.push(encryptedOutputAddress)
    if (log) await log.send('Constructed initial output list')
  } else { // Inner shuffler
    /* Gather output list messages from prior shuffler. */
    const priorShuffler = hexToBytes(priorShufflerHex)
    const priorOutputListPackets = await this.gatherShuffleOutput({
      attempts,
      timeout,
      priorShuffler,
      precedingShufflersCount,
      receiver,
      discarder
    })
    if (log) await log.send('Received encrypted output list')

    /* Extract output list items. */
    const encryptedOutputEncodedList = priorOutputListPackets.map(
      function iteratePriorOutputListPackets (packet) {
        return packet.message.str
      }
    )

    /* Transfer decode output list items. */
    const encryptedOutputList = encryptedOutputEncodedList.map(
      function iterateEncryptedOutputEncodedList (item) {
        return transferDecodeShuffleOutput(item)
      }
    )

    /* Decrypt output list. */
    const decryptedOutputEncodedList = await this.decryptOutputList(
      encryptedOutputList,
      crypto
    )

    /* Decode output list. */
    const decryptedOutputList = decryptedOutputEncodedList.map(
      function iterateDecryptedOutputEncodedList (item) {
        return cryptDecodeBytes(item)
      }
    )

    /* Extend output list. */
    const extendedOutputList = [
      ...decryptedOutputList,
      encryptedOutputAddress
    ]
    if (log) await log.send('Added own output address to output list')

    /* Shuffle output list. */
    const shuffledOutputList = [ ...extendedOutputList ]
    await shuffleList(shuffledOutputList)
    if (log) await log.send('Shuffled output list')

    /* Stage new output list. */
    outputList.push(...shuffledOutputList)
  }

  /* Unicast output list. */
  const signingPublicKeyHex = await signingKeyPair.exportPublicKey()
  const signingPublicKey = hexToBytes(signingPublicKeyHex)
  const nextShuffler = hexToBytes(nextShufflerHex)
  const ownSignedPackets = []
  for (const output of outputList) {
    const ownPacket = await this.messageShuffleOutput({
      protocol,
      signingPublicKey,
      sessionId,
      poolNumber,
      output,
      nextShuffler
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
    ownSignedPackets.push(ownSignedPacket)
  }
  const ownPackage = await this.packageSignedPackets(
    protocol,
    ownSignedPackets
  )
  await outchan.send(ownPackage)
  if (log) await log.send('Sent encrypted output list')

  /* Return output key pair. */
  return { outputKeyPair }
}

export default shuffle
