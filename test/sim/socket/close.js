import privs from './privs'

async function close () {
  const priv = privs.get(this)
  if (!priv.open) return
  priv.open = false
  priv.first.destroy()
  priv.second.destroy()
}

export default close
