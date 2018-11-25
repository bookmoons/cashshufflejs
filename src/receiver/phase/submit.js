import { MissingValueError, ValueError } from '/error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/phase.PhaseReceiver
 *
 * @param {object} message
 */
async function submit (message) {
  const priv = privs.get(this)
  const fieldFromKey = message.fromKey
  if (typeof fieldFromKey !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('from_key')
      ])
    }
    return
  }
  const senderPublicKey = fieldFromKey.key
  if (typeof senderPublicKey !== 'string') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('from_key.key')
      ])
    }
    return
  }
  if (!priv.inboxes.has(senderPublicKey)) {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new ValueError('Unrecognized public key: ' + senderPublicKey)
      ])
    }
    return
  }
  const inbox = priv.inboxes.get(senderPublicKey)
  inbox.add(message)
}

export default submit
