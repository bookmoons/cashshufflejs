import privs from './privs'

function empty () {
  const priv = privs.get(this)
  return priv.empty || Promise.resolve()
}

export default empty
