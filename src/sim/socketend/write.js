import privs from './privs'

function _write (chunk, encoding, callback) {
  const priv = privs.get(this)
  const writeHandler = priv.writeHandler
  const writeHandlerDone = writeHandler(chunk)
  writeHandlerDone
    .then(function handleWriteHandlerDone () {
      callback()
    })
    .catch(function handleWriteHandlerError (error) {
      callback(error)
    })
}

export default _write
