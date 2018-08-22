import privs from './privs'

function add (message) {
  const priv = privs.get(this)
  priv.messages.push(message)
}

export default add
