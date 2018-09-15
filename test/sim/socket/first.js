import privs from './privs'

/**
 * First socket end.
 *
 * @var {SocketEndSimulator}
 * @memberof module:cashshuffle/sim/socket.SocketSimulator
 * @instance
 */
function first () {
  const priv = privs.get(this)
  return priv.first
}

export default first
