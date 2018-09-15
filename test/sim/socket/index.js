/**
 * Socket simulator.
 *
 * Simulates 2 way communication through a socket.
 * Provides 2 `Duplex` instances: 1 for each communicating node.
 *
 * @module cashshuffle/sim/socket
 */

import SocketSimulator from './main'
import first from './first'
import second from './second'

Object.defineProperty(SocketSimulator.prototype, 'first', {
  get: first
})
Object.defineProperty(SocketSimulator.prototype, 'second', {
  get: second
})

export default SocketSimulator
