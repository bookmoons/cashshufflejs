import { Phase } from '../../protocol'

/**
 * @typedef {object} MessageFinalOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Address} outputAddress - Output address.
 */

/**
 * Construct final output item message.
 *
 * Contains single final output list item.
 * Component of message sequence delivering the full output list.
 * Output list item is in the `packet.message.str` field.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageFinalOutputParams} params
 *
 * @return {protocol.Packet} Unsigned final output item message.
 */
function messageFinalOutput ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  outputAddress
}) {
  const messageObject = { str: outputAddress }
  const fromKeyObject = { key: signingPublicKey }
  const packetObject = {
    session: sessionId,
    number: poolNumber,
    fromKey: fromKeyObject,
    phase: Phase.Broadcast.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageFinalOutput
