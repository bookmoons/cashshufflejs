import processItem from './item'
import privs from './privs'

async function process () {
  const priv = privs.get(this)
  priv.processing = true
  const buffer = priv.buffer
  while (buffer.length) await processItem.call(this)
  priv.stop = null
  priv.processing = false
}

export default process
