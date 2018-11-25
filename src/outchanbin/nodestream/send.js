import { BusyError } from '/error'
import { terminatorBytes } from '/protocol'
import { bytesToNodeBuffer } from '/aid/convert'
import { concatenateBytes } from '/aid/bytes'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (privs.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const packet = concatenateBytes([ message, terminatorBytes ])
  const packetNodeBuffer = bytesToNodeBuffer(packet)
  priv.stream.write(packetNodeBuffer)
  priv.sending = false
}

export default send
