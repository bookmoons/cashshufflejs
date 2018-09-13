import StopSignal from './StopSignal'
import privs from './privs'

async function stop () {
  const priv = privs.get(this)
  const log = priv.log
  const stopSignal = new StopSignal()
  priv.cancel(stopSignal)
  if (priv.watch) priv.rejectWatch()
  priv.runToken = null
  priv.cancel = null
  priv.watch = null
  priv.resolveWatch = null
  priv.rejectWatch = null
  priv.drawing = false
  if (log) await log.send('Stopped drawing')
}

export default stop
