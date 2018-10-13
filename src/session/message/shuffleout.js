import { Phase } from '../../protocol'

/**
 * @typedef {object} MessageShuffleOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Base64} output - Single output address layered encryption.
 * @prop {HexString} nextShuffler - Signing public key of next shuffler.
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
  const messageObject = { str: output }
  const fromKeyObject = { key: signingPublicKey }
  const toKeyObject = { key: nextShuffler }
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
