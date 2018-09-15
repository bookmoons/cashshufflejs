import { Duplex } from 'stream'
import handleReadData from './read/data'
import privs from './privs'

/**
 * @typedef {object} SocketEndParams
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 *
 * @prop {ReadHandler} readHandler - Read handler.
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
    readHandler,
    writeHandler
  }) {
    super()
    const self = this
    function deliverReadData (chunk) {
      handleReadData.call(self, chunk)
    }
    const priv = {
      deliverReadData,
      readHandler,
      writeHandler
    }
    privs.set(this, priv)
  }
}

export default SocketEndSimulator
