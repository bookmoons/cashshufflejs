import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  const recipients = priv.recipients
  const sendPromises = new Set()
  for (const recipient of recipients) {
    const sendPromise = recipient.send(message)
    sendPromises.add(sendPromise)
  }
  await Promise.all(sendPromises)
}

export default send
