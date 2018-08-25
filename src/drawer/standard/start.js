import privs from './privs'
import draw from './draw'

function start () {
  const priv = privs.get(this)
  if (priv.drawing) return
  priv.drawing = true
  priv.runToken = Symbol('DrawerRunToken')
  draw.call(this)
}

export default start
