import { appendFile } from 'fs'
import { EOL } from 'os'
import privs from './privs'

async function send (message) {
  const self = this
  return new Promise(function executeLogchanSend (resolve, reject) {
    const priv = privs.get(self)
    const packet = message + EOL
    appendFile(priv.filePath, packet, function handleLogchanSent (err) {
      if (err) reject(err)
      resolve()
    })
  })
}

export default send
