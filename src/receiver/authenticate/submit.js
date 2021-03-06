import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'
import { MissingValueError, ValueError } from '/error'
import { bytesToHex, utf8ToString } from '/aid/convert'
import { normalizeProtobufBytes } from '/aid/normalize'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/authenticate.AuthenticateReceiver
 *
 * @param {protocol.Signed} message - Signed packet to verify signature of.
 */
async function submit (message) {
  const priv = privs.get(this)
  const protocol = priv.protocol
  const messageObject = protocol.Signed.toObject(message)
  const packet = messageObject.packet
  if (typeof packet !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('packet')
      ])
    }
    return
  }
  const fieldFromKey = packet.fromKey
  if (typeof fieldFromKey !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('packet.from_key')
      ])
    }
    return
  }
  const senderPublicKeyString = fieldFromKey.key
  if (typeof senderPublicKeyString !== 'string') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('packet.from_key.key')
      ])
    }
    return
  }
  const fieldSignature = messageObject.signature
  if (typeof fieldSignature !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('signature')
      ])
    }
    return
  }
  const signatureBytesDenormal = fieldSignature.signature
  if (!signatureBytesDenormal) {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('signature.signature')
      ])
    }
    return
  }
  const senderPublicKey = new bitcore.PublicKey(
    senderPublicKeyString,
    { network: priv.network }
  )
  const senderAddress = senderPublicKey.toAddress(priv.network)
  const signatureBytes = normalizeProtobufBytes(signatureBytesDenormal)
  const signatureString = utf8ToString(signatureBytes)
  const packetBytesDenormal = protocol.Packet.encode(packet).finish()
  const packetBytes = normalizeProtobufBytes(packetBytesDenormal)
  const packetHex = bytesToHex(packetBytes)
  const messageSigner = new Message(packetHex)
  let valid
  try {
    valid = messageSigner.verify(senderAddress, signatureString)
  } catch (e) {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new ValueError(e, 'signature verification failed')
      ])
    }
    return
  }
  if (!valid) {
    if (priv.discarder) {
      const reason = messageSigner.error
      await priv.discarder.submit([
        message,
        new ValueError(reason)
      ])
    }
    return
  }
  await priv.nextReceiver.submit(message)
}

export default submit
