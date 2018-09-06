import { Phase } from '../../protocol'
import { outputListDelimiter } from '../value'

/**
 * @typedef {object} MessageFinalOutputParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 * @prop {Iterable<CashAddr>} outputList - List of output addresses.
 */

/**
 * Construct final output list message.
 *
 * Output list is encoded in a single string.
 * Items are delimited with ampersand `&`.
 * Encoded value is in the `packet.message.str` field.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageFinalOutputParams} params
 *
 * @return {protocol.Packet} Unsigned final output list message.
 */
function messageFinalOutput ({
  protocol,
  signingPublicKey,
  sessionId,
  participantNumber,
  outputList
}) {
  const sessionIdView = new Uint8Array(sessionId)
  const outputListArray = [ ...outputList ]
  const outputListEncoded = outputListArray.join(outputListDelimiter)
  const messageObject = {
    str: outputListEncoded
  }
  const fromKeyObject = {
    key: signingPublicKey
  }
  const packetObject = {
    session: sessionIdView,
    number: participantNumber,
    fromKey: fromKeyObject,
    phase: Phase.Broadcast.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageFinalOutput
