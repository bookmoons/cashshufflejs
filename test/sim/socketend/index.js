/**
 * Socket end simulator.
 *
 * Simulates 1 end of a 2 way communication socket.
 *
 * @module cashshuffle/sim/socketend
 */

import SocketEndSimulator from './main'
import _read from './read'
import _write from './write'

Object.assign(SocketEndSimulator.prototype, {
  _read,
  _write
})

Object.freeze(SocketEndSimulator)

export default SocketEndSimulator
