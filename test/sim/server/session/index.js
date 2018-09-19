/**
 * CashShuffler server for session portion of a shuffle.
 *
 * Provides a local server that broadcasts and unicasts correctly.
 * Open a connection to receive a `Duplex` stream.
 * Provide signing public key when opening connection.
 *
 * @module cashshuffle/sim/server/session
 */

import SessionServerSimulator from './main'
import connect from './connect'

Object.assign(SessionServerSimulator.prototype, {
  connect
})

Object.freeze(SessionServerSimulator)

export default SessionServerSimulator
