import { MissingValueError, ValueError } from '../../error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/phase~PhaseReceiver
 *
 * @param {object} message
 */
async function submit (message) {
  const priv = privs.get(this)
  const fieldFromKey = message.fromKey
  if (typeof fieldFromKey !== 'object') {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('from_key'),
        message
      ])
    }
    return
  }
  const senderPublicKey = fieldFromKey.key
  if (typeof senderPublicKey !== 'string') {
    if (priv.discarder) {
      await priv.discarder.submit([
        new MissingValueError('from_key.key'),
        message
      ])
    }
    return
  }
  if (!priv.inboxes.has(senderPublicKey)) {
    if (priv.discarder) {
      await priv.discarder.submit([
        new ValueError('Unrecognized public key: ' + senderPublicKey),
        message
      ])
    }
    return
  }
  const inbox = priv.inboxes.get(senderPublicKey)
  inbox.add(message)
}

export default submit
