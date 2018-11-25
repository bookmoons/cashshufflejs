import { EmptyError } from '/error'
import privs from './privs'

function receive () {
  const priv = privs.get(this)
  if (!priv.messages.length) throw new EmptyError('no messages')
  const message = priv.messages.shift()
  return message
}

export default receive
