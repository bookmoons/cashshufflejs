import privs from './privs'

async function processItem () {
  const priv = privs.get(this)
  const data = priv.buffer.shift()
  await priv.processor(data)
}

export default processItem
