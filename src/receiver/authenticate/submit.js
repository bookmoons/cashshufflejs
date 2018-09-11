import bitcore from 'bitcore-lib-cash'
import Message from '@bookmoons/bitcore-message-cash'
import { MissingValueError, ValueError } from '../../error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/authenticate~Receiver
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
        new MissingValueError('packet'),
        message
      ])
    }
    return
  }
  const fieldFromKey = packet.fromKey
  if (typeof fieldFromKey !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('packet.from_key'),
        message
      ])
    }
    return
  }
  const senderPublicKeyString = fieldFromKey.key
  if (typeof senderPublicKeyString !== 'string') {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('packet.from_key.key'),
        message
      ])
    }
    return
  }
  const fieldSignature = messageObject.signature
  if (typeof fieldSignature !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('signature'),
        message
      ])
    }
    return
  }
  const signatureValue = fieldSignature.signature
  if (!signatureValue) {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('signature.signature'),
        message
      ])
    }
    return
  }
  const senderPublicKey = new bitcore.PublicKey(
    senderPublicKeyString,
    { network: priv.network }
  )
  const senderAddress = senderPublicKey.toAddress()
  // Normalize to buffer. protobufjs can return Uint8Array Buffer Array.
  const signatureBuffer = Buffer.from(signatureValue)
  const signatureString = signatureBuffer.toString('utf8')
  const packetEncoded = protocol.Packet.encode(packet).finish()
  // Normalize to buffer.
  const packetBuffer = Buffer.from(packetEncoded)
  const packetString = packetBuffer.toString('hex')
  const messageSigner = new Message(packetString)
  let valid
  try {
    valid = messageSigner.verify(senderAddress, signatureString)
  } catch (e) {
    if (priv.discarder) {
      await priv.discarder.submit([
        new ValueError(e, 'signature verification failed'),
        message
      ])
    }
    return
  }
  if (!valid) {
    if (priv.discarder) {
      const reason = messageSigner.error
      await priv.discarder.submit([
        new ValueError(reason),
        message
      ])
    }
    return
  }
  await priv.nextReceiver.submit(message)
}

export default submit
