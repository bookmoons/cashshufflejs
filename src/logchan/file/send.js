import { appendFile } from 'fs'
import privs from './privs'

async function send (message) {
  const self = this
  return new Promise(function executeLogchanSend (resolve, reject) {
    const priv = privs.get(self)
    const packet = message + '\n'
    appendFile(priv.filePath, packet, function handleLogchanSent (err) {
      if (err) reject(err)
      resolve()
    })
  })
}

export default send
