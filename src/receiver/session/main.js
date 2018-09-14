import PhaseReceiver from '../phase'
import Receiver from '../base'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/session
 */
class SessionReceiver extends Receiver {
  /**
   * @param {Iterable<HexString>} shufflers - Shuffler public keys.
   * @param {Iterable<number>} phaseIdentifiers - Protocol message phase
   *     identifiers.
   * @param {Receiver} [discarder=] - Message receiver that handles
   *     discarded messages.
   * @param {function} [phaseReceiverFactory=] - Factory function
   *     providing phase receiver instances.
   */
  constructor (
    shufflers,
    phaseIdentifiers,
    discarder = null,
    phaseReceiverFactory = null
  ) {
    super()
    const shufflersSet = new Set(shufflers)
    if (!phaseReceiverFactory) {
      phaseReceiverFactory = function produceDefaultPhaseReceiver () {
        return new PhaseReceiver(shufflersSet, discarder)
      }
    }
    const phaseIdentifiersSet = new Set(phaseIdentifiers)
    const phaseReceivers = new Map()
    for (const phaseIdentifier of phaseIdentifiersSet) {
      phaseReceivers.set(phaseIdentifier, phaseReceiverFactory())
    }
    const priv = {
      shufflers: shufflersSet,
      phaseIdentifiers: phaseIdentifiersSet,
      phaseReceivers,
      discarder
    }
    privs.set(this, priv)
  }
}

export default SessionReceiver
