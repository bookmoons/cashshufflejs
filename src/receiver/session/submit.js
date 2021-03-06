import { MissingValueError, ValueError } from '/error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/session.SessionReceiver
 *
 * @param {object} message
 */
async function submit (message) {
  const priv = privs.get(this)
  const phaseIdentifier = message.phase
  if (typeof phaseIdentifier !== 'number') {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new MissingValueError('phase')
      ])
    }
    return
  }
  if (!priv.phaseIdentifiers.has(phaseIdentifier)) {
    if (priv.discarder) {
      await priv.discarder.submit([
        message,
        new ValueError(
          { info: { phaseIdentifier } },
          'unrecognized phase id'
        )
      ])
    }
    return
  }
  const phaseReceiver = priv.phaseReceivers.get(phaseIdentifier)
  await phaseReceiver.submit(message)
}

export default submit
