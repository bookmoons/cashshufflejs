import privs from './privs'

/**
 * Phase identifier indexed map of phase receivers.
 * @prop {Map} phaseReceivers
 * @memberof module:cashshuffle/receiver/session~Receiver
 */
function phaseReceivers () {
  const priv = privs.get(this)
  const phaseReceiversCopy = new Map(priv.phaseReceivers)
  return phaseReceiversCopy
}

export default phaseReceivers
