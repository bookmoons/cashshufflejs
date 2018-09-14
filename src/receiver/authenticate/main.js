import bitcore from 'bitcore-lib-cash'
import Receiver from '../base'
import privs from './privs'

const mainnet = bitcore.Networks.mainnet

/**
 * @typedef {object} AuthenticateReceiverParams
 * @memberof module:cashshuffle/receiver/authenticate
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {Receiver} nextReceiver - Receiver to deliver message to.
 * @prop {Receiver} [discarder=] - Receiver to discard messages to.
 * @prop {bitcore.Network} [network=<mainnet>] - Bitcoin Cash network.
 */

/**
 * @memberof module:cashshuffle/receiver/authenticate
 */
class AuthenticateReceiver extends Receiver {
  /**
   * @param {AuthenticateReceiverParams} params
   */
  constructor ({
    protocol,
    nextReceiver,
    discarder = null,
    network = mainnet
  }) {
    super()
    const priv = {
      protocol,
      nextReceiver,
      discarder,
      network
    }
    privs.set(this, priv)
  }
}

export default AuthenticateReceiver
