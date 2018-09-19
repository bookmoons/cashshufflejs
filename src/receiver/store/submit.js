import privs from './privs'

async function submit (message) {
  const priv = privs.get(this)
  priv.inbox.add(message)
}

export default submit
