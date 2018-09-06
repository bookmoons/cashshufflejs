import { BusyError, TimeoutError } from '../../error'
import privs from './privs'

function watch (timeout = null) {
  const self = this
  return new Promise(function executeWatch (resolve, reject) {
    const priv = privs.get(self)

    // Prevent double calls
    if (priv.watching) throw new BusyError('Another watch call is running')
    priv.watching = true

    // Nonempty inbox
    if (priv.messages.length) {
      const message = priv.messages.shift()
      priv.watching = false
      resolve(message)
      return
    }

    // Schedule timeout
    if (timeout !== null) {
      const timer = priv.timer = setTimeout(function handleWatchTimeout () {
        if (timer !== priv.timer) return // Quell late timeouts
        priv.timer = null
        priv.watcher = null
        priv.watching = false
        const error = new TimeoutError(
          { info: { timeout } },
          'watch'
        )
        reject(error)
      }, timeout)
    }

    // Watch for message
    priv.watcher = function handleWatchedInboxReceivedMessage () {
      if (timeout !== null) {
        clearTimeout(priv.timer)
        priv.timer = null
      }
      const message = priv.messages.shift()
      priv.watcher = null
      priv.watching = false
      resolve(message)
    }
  })
}

export default watch
