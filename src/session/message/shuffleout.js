import { Phase } from '../../protocol'

/**
 * @typedef {object} MessageOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
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
 * @param {MessageOutputParams} params
 *
 * @return {protocol.Packet} Unsigned output item message.
 */
function messageShuffleOutput ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  output,
  nextShuffler
}) {
  const sessionIdView = new Uint8Array(sessionId)
  const messageObject = { str: output }
  const fromKeyObject = { key: signingPublicKey }
  const toKeyObject = { key: nextShuffler }
  const packetObject = {
    session: sessionIdView,
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
