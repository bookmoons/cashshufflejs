import handleReadError from './read/error'
import privs from './privs'

function _read (size) {
  const priv = privs.get(this)
  const self = this
  const readHandlerDone = priv.readHandler(
    size,
    priv.deliverReadData
  )
  readHandlerDone
    .catch(function handleReadHandlerError (error) {
      handleReadError.call(self, error)
    })
}

export default _read
