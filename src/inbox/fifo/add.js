import privs from './privs'

function add (message) {
  const priv = privs.get(this)
  priv.messages.push(message)
  if (priv.watching) priv.watcher()
}

export default add
