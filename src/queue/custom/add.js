import process from './process'
import privs from './privs'

function add (data) {
  const priv = privs.get(this)
  priv.buffer.push(data)
  if (!priv.processing) priv.empty = process.call(this)
}

export default add
