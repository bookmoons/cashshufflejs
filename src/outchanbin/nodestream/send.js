import { BusyError } from '../../error'
import { terminatorBuffer } from '../../protocol'
import { bufferToBytes, bytesToNodeBuffer } from '../../util'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (privs.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageBytes = bufferToBytes(message)
  const messageNodeBuffer = bytesToNodeBuffer(messageBytes)
  const packetNodeBuffer = Buffer.concat([
    messageNodeBuffer,
    terminatorBuffer
  ])
  priv.stream.write(packetNodeBuffer)
  priv.sending = false
}

export default send
