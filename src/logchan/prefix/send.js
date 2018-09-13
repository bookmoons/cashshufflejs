import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  const prefixedMessage = priv.prefix + message
  await priv.nextLogchan.send(prefixedMessage)
}

export default send
