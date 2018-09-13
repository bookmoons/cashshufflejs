import privs from './privs'
import draw from './draw'

async function start () {
  const priv = privs.get(this)
  const log = priv.log
  if (priv.drawing) return
  priv.drawing = true
  priv.runToken = Symbol('DrawerRunToken')
  draw.call(this)
  if (log) await log.send('Started drawing')
}

export default start
