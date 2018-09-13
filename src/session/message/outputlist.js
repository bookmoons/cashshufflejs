import { Phase } from '../../protocol'
import { outputListDelimiter } from '../value'

/**
 * @typedef {object} MessageOutputListParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} poolNumber - Participant pool number.
 * @prop {Iterable<Base64>} outputList - List of output address layered
 *     encryptions.
 * @prop {HexString} nextParticipant - Signing public key of next participant.
 */

/**
 * Construct output list message.
 *
 * Output list is encoded in a single string.
 * Items are delimited with ampersand `&`.
 * Encoded value is in the `packet.message.str` field.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageOutputListParams} params
 *
 * @return {protocol.Packet} Unsigned output list message.
 */
function messageOutputList ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  outputList,
  nextParticipant
}) {
  const sessionIdView = new Uint8Array(sessionId)
  const outputListArray = [ ...outputList ]
  const outputListEncoded = outputListArray.join(outputListDelimiter)
  const messageObject = { str: outputListEncoded }
  const fromKeyObject = { key: signingPublicKey }
  const toKeyObject = { key: nextParticipant }
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

export default messageOutputList
