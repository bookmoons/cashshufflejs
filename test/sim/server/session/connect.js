import CustomQueue from 'queue/custom'
import { BusyError } from 'error'
import SocketSimulator from 'sim/socket'
import handleData from './event/data'
import processChunk from './process/chunk'
import privs from './privs'

/**
 * @memberof module:cashshuffle/sim/server/session.SessionServerSimulator
 *
 * @param {HexString} signingPublicKey - Shuffler signing public key.
 *
 * @return {SocketEndSimulator<Buffer>} Duplex stream providing 2 way
 *     communication with the server.
 *
 * @throws {BusyError} If named shuffler is already connected.
 *     Message `'already connected'`.
 */
async function connect (signingPublicKey) {
  const priv = privs.get(this)
  if (priv.connections.has(signingPublicKey)) {
    throw new BusyError(
      { info: { signingPublicKey } },
      'already connected'
    )
  }
  const self = this
  const socket = new SocketSimulator()
  const localEnd = socket.first
  const remoteEnd = socket.second
  const buffer = Buffer.alloc(0)
  const queue = new CustomQueue(drawData)
  const connection = {
    socket,
    localEnd,
    buffer,
    queue
  }
  async function drawData (data) {
    await processChunk.call(self, connection, data)
  }
  localEnd.on('data', function receiveData (chunk) {
    handleData.call(self, connection, chunk)
  })
  priv.connections.set(signingPublicKey, connection)
  return remoteEnd
}

export default connect
