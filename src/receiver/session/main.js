import PhaseReceiver from '../phase'
import privs from './privs'

/**
 * @memberof module:cashshuffle/receiver/session
 */
class SessionReceiver {
  /**
   * @param {Iterable<HexString>} participants - Participant public keys.
   * @param {Iterable<number>} phaseIdentifiers - Protocol message phase
   *     identifiers.
   * @param {Receiver} [discarder=null] - Message receiver that handles
   *     discarded messages.
   * @param {function} [phaseReceiverFactory=null] - Factory function
   *     providing phase receiver instances.
   */
  constructor (
    participants,
    phaseIdentifiers,
    discarder = null,
    phaseReceiverFactory = null
  ) {
    const participantsSet = new Set(participants)
    if (!phaseReceiverFactory) {
      phaseReceiverFactory = function produceDefaultPhaseReceiver () {
        return new PhaseReceiver(participantsSet, discarder)
      }
    }
    const phaseIdentifiersSet = new Set(phaseIdentifiers)
    const phaseReceivers = new Map()
    for (const phaseIdentifier of phaseIdentifiersSet) {
      phaseReceivers.set(phaseIdentifier, phaseReceiverFactory())
    }
    const priv = {
      participants: participantsSet,
      phaseIdentifiers: phaseIdentifiersSet,
      phaseReceivers,
      discarder
    }
    privs.set(this, priv)
  }
}

export default SessionReceiver
