import bitcore from 'bitcore-lib-cash'
import privs from './privs'

const mainnet = bitcore.Networks.mainnet

/**
 * @memberof module:cashshuffle/receiver/authenticate
 */
class Receiver {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   * @param {Receiver} nextReceiver - Receiver to deliver message to.
   * @param {Receiver} [discarder=null] - Message receiver that handles
   *     discarded messages.
   * @param {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
   */
  constructor (protocol, nextReceiver, discarder = null, network = mainnet) {
    const priv = {
      protocol,
      nextReceiver,
      discarder,
      network
    }
    privs.set(this, priv)
  }
}

export default Receiver
