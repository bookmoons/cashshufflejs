import privs from './privs'

/**
 * Phase receivers.
 *
 * Index phase identifier.
 * Value phase receiver.
 *
 * @var {Map} phaseReceivers
 * @memberof module:cashshuffle/receiver/session~Receiver
 * @instance
 */
function phaseReceivers () {
  const priv = privs.get(this)
  const phaseReceiversCopy = new Map(priv.phaseReceivers)
  return phaseReceiversCopy
}

export default phaseReceivers
