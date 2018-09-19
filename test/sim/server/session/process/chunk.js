import privs from '../privs'
import { ValueError } from 'error'
import undelimit from '../undelimit'

/**
 * Process new chunk of data from connection.
 *
 * @param {object} connection - Connection package.
 * @param {Buffer} data - Data to process. Not modified.
 */
async function processChunk (connection, data) {
  const priv = privs.get(this)
  connection.buffer = Buffer.concat([ connection.buffer, data ])
  let undelimitResult, message, newData
  while (true) {
    try {
      undelimitResult = undelimit(connection.buffer)
    } catch (e) {
      if (
        e instanceof ValueError &&
        e.message === 'no delimited message'
      ) { return } else throw e
    }
    message = undelimitResult[0]
    newData = undelimitResult[1]
    connection.buffer = newData
    priv.messageQueue.add([ connection, message ])
  }
}

export default processChunk
