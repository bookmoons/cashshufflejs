import Long from 'long'
import { Phase } from '../../protocol'
import { hexToBytes } from '../../aid/convert'

/**
 * @typedef {object} MessageSignatureParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition. Not modified.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {Uint8Array} sessionId - Session identifier. Not modified.
 * @prop {number} poolNumber - Shuffler pool number.
 * @prop {Iterable<Coin~InputSignature>} signatures - Signatures.
 *     `Map` instances work well. Key input index. Value signature.
 *     Items not modified.
 */

/**
 * Construct signature message.
 *
 * Signatures are in the `packet.message.signatures` repeated field.
 *
 * @memberof module:cashshuffle/session.Session
 *
 * @param {MessageSignatureParams} params
 *
 * @return {protocol.Packet} Unisnged signature message.
 */
function messageSignature ({
  protocol,
  signingPublicKey,
  sessionId,
  poolNumber,
  signatures
}) {
  const inputSignatureObjects = []
  for (const [ inputIndexString, signature ] of signatures) {
    const inputIndex = Long.fromString(inputIndexString, true, 10)
    const signatureBytes = hexToBytes(signature)
    const inputSignatureObject = {
      index: inputIndex,
      signature: { signature: signatureBytes }
    }
    inputSignatureObjects.push(inputSignatureObject)
  }
  const messageObject = { signatures: inputSignatureObjects }
  const fromKeyObject = { key: signingPublicKey }
  const packetObject = {
    session: sessionId,
    number: poolNumber,
    fromKey: fromKeyObject,
    phase: Phase.VerificationSubmission.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageSignature
