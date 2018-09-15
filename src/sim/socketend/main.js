import { Duplex } from 'stream'
import privs from './privs'

/**
 * @typedef {object} SocketEndParams
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 *
 * @prop {WriteHandler} writeHandler - Write handler.
 */

/**
 * @memberof module:cashshuffle/sim/socketend
 */
class SocketEndSimulator extends Duplex {
  /**
   * @param {SocketEndParms} params
   */
  constructor ({
    writeHandler
  }) {
    super()
    const priv = {
      writeHandler
    }
    privs.set(this, priv)
  }
}

export default SocketEndSimulator
