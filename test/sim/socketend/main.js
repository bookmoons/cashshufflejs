import { Duplex } from 'stream'
import handleReadData from './read/data'
import privs from './privs'

/**
 * @typedef {object} SocketEndParams
 * @memberof module:cashshuffle/sim/socketend.SocketEndSimulator
 *
 * @prop {ReadHandler} read - Read handler. Not modified.
 * @prop {WriteHandler} write - Write handler. Not modified.
 */

/**
 * @memberof module:cashshuffle/sim/socketend
 */
class SocketEndSimulator extends Duplex {
  /**
   * @param {SocketEndParms} params
   */
  constructor ({
    read,
    write
  }) {
    super()
    const self = this
    function deliverReadData (chunk) {
      handleReadData.call(self, chunk)
    }
    const priv = {
      deliverReadData,
      readHandler: read,
      writeHandler: write
    }
    privs.set(this, priv)
  }
}

export default SocketEndSimulator
