import privs from './privs'

/**
 * Second socket end.
 *
 * @var {SocketEndSimulator}
 * @memberof module:cashshuffle/sim/socket.SocketSimulator
 * @instance
 */
function second () {
  const priv = privs.get(this)
  return priv.second
}

export default second
