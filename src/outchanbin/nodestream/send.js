import { terminatorBuffer } from '../../protocol'
import { BusyError } from '../../error'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (privs.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageBuffer = Buffer.from(message)
  const packetBuffer = Buffer.concat([ messageBuffer, terminatorBuffer ])
  priv.stream.write(packetBuffer)
  priv.sending = false
}

export default send
