import StopSignal from './StopSignal'
import privs from './privs'

function draw () {
  const priv = privs.get(this)
  const self = this
  const runToken = priv.runToken
  const cancelPromise = new Promise(function executeCancelPromise (resolve) {
    priv.cancel = resolve
  })
  const messagePromise = priv.inchan.receive()
  const drawPromise = Promise.race([ cancelPromise, messagePromise ])
  drawPromise
    .then(function handleDrawResolved (value) {
      if (value instanceof StopSignal) return
      priv.receiver.submit(value)
        .then(function handleMessageRelayed () {
          if (runToken !== priv.runToken) return // Quell after stop
          if (priv.watch) {
            priv.resolveWatch(value)
            priv.watch = null
            priv.resolveWatch = null
            priv.rejectWatch = null
          }
          draw.call(self)
        })
    })
}

export default draw
