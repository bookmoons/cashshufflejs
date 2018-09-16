import privs from './privs'
import CustomQueue from 'queue/custom'
import processMessage from './process/message'
import routeSignedPacket from './route'

/**
 * @memberof module:cashshuffle/sim/server/session
 */
class SessionServerSimulator {
  /**
   * @param {protobufjs.Root} protocol - Protocol definition.
   */
  constructor (protocol) {
    const self = this
    const connections = new Map()
    async function drawSignedPacket (signedPacket) {
      await routeSignedPacket.call(self, signedPacket)
    }
    const routeQueue = new CustomQueue(drawSignedPacket)
    async function drawMessage ([ connection, message ]) {
      await processMessage.call(self, connection, message)
    }
    const messageQueue = new CustomQueue(drawMessage)
    const priv = {
      protocol,
      connections,
      messageQueue,
      routeQueue
    }
    privs.set(this, priv)
  }
}

export default SessionServerSimulator
