import FifoInbox from 'inbox/fifo'
import makeSocketEnd from './end'
import privs from './privs'

/**
 * @memberof module:cashshuffle/sim/socket
 */
class SocketSimulator {
  constructor () {
    const firstSecond = new FifoInbox()
    const secondFirst = new FifoInbox()
    const first = makeSocketEnd(firstSecond, secondFirst)
    const second = makeSocketEnd(secondFirst, firstSecond)
    const priv = {
      first,
      second
    }
    privs.set(this, priv)
  }
}

export default SocketSimulator
