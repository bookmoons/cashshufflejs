import privs from './privs'

/**
 * Fulfill write request.
 *
 * @param {Buffer} chunk - Data chunk written. Not modified.
 * @param {string} encoding - Encoding of string chunk. Unused.
 * @param {function} callback - Done callback. Not modified.
 */
function _write (chunk, encoding, callback) {
  const priv = privs.get(this)
  const writeHandlerDone = priv.writeHandler(chunk)
  writeHandlerDone
    .then(function handleWriteHandlerDone () {
      callback()
    })
    .catch(function handleWriteHandlerError (error) {
      callback(error)
    })
}

export default _write
