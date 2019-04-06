import { transferEncodeKey, transferEncodeShuffleOutput } from '/aid/code'
import { Phase } from '/protocol'

/**
 * @typedef {object} MessageShuffleOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {Uint8Array} signingPublicKey - Signing public key.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Uint8Array} output - Single output address layered encryption.
 * @prop {Uint8Array} nextShuffler - Signing public key of next shuffler.
 */

/**
 * Construct shuffle output item message.
 *
 * Contains single shuffle output list item.
 * Component of message sequence delivering the full output list.
 * Output list item is in the `packet.message.str` field.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageShuffleOutputParams} params
 *
 * @return {protocol.Packet} Unsigned shuffle output item message.
 */
function messageShuffleOutput ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  output,
  nextShuffler
}) {
  const outputEncoded = transferEncodeShuffleOutput(output)
  const messageObject = { str: outputEncoded }
  const signingPublicKeyEncoded = transferEncodeKey(signingPublicKey)
  const fromKeyObject = { key: signingPublicKeyEncoded }
  const nextShufflerEncoded = transferEncodeKey(nextShuffler)
  const toKeyObject = { key: nextShufflerEncoded }
  const packetObject = {
    session: sessionId,
    number: poolNumber,
    fromKey: fromKeyObject,
    toKey: toKeyObject,
    phase: Phase.Shuffle.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageShuffleOutput
