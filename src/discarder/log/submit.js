import privs from './privs'

async function submit ([ message, error ]) {
  const priv = privs.get(this)
  const log = priv.log
  const logMessage = 'Discarded message: ' + error.message
  await log.send(logMessage)
}

export default submit
