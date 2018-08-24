import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/store~Receiver
 *
 * @param {Array<Error,*>} message - Discard reason and discarded message.
 */
async function submit (message) {
  const priv = privs.get(this)
  priv.inbox.add(message)
}

export default submit
