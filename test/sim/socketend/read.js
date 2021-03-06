import handleReadError from './read/error'
import privs from './privs'

/**
 * Fulfill read request.
 *
 * @param {number} size - Number of bytes to read.
 */
function _read (size) {
  const priv = privs.get(this)
  const self = this
  const readHandlerDone = priv.readHandler(
    size,
    priv.deliverReadData
  )
  readHandlerDone
    .catch(function deliverReadError (error) {
      handleReadError.call(self, error)
    })
}

export default _read
