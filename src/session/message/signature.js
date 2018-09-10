import { Phase } from '../../protocol'
import toArrayBuffer from '../../util/toarraybuffer'

/**
 * @typedef {object} MessageSignatureParams
 * @memberof module:cashshuffle/session.Session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {HexString} signingPublicKey - Signing public key.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {number} participantNumber - Participant index in pool in join order.
 * @prop {Iterable<long.Long-Coin~Signature>} signatures - Signatures.
 *     Key input index. Value signature. `Map` instances work well.
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
  participantNumber,
  signatures
}) {
  const sessionIdView = new Uint8Array(sessionId)
  const inputSignatureObjects = []
  for (const [ inputIndex, signature ] of signatures) {
    const signatureBuffer = Buffer.from(signature, 'hex')
    const signatureBinary = toArrayBuffer(signatureBuffer)
    const signatureView = new Uint8Array(signatureBinary)
    const inputSignatureObject = {
      index: inputIndex,
      signature: { signature: signatureView }
    }
    inputSignatureObjects.push(inputSignatureObject)
  }
  const messageObject = { signatures: inputSignatureObjects }
  const fromKeyObject = { key: signingPublicKey }
  const packetObject = {
    session: sessionIdView,
    number: participantNumber,
    fromKey: fromKeyObject,
    phase: Phase.VerificationSubmission.value,
    message: messageObject
  }
  const packet = protocol.Packet.fromObject(packetObject)
  return packet
}

export default messageSignature
