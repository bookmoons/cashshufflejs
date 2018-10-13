import { BusyError } from '../../error'
import { terminatorNodeBuffer } from '../../protocol'
import { bufferToBytes, bytesToNodeBuffer } from '../../aid/convert'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (privs.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageBytes = bufferToBytes(message)
  const messageNodeBuffer = bytesToNodeBuffer(messageBytes)
  const packetNodeBuffer = Buffer.concat([
    messageNodeBuffer,
    terminatorNodeBuffer
  ])
  priv.stream.write(packetNodeBuffer)
  priv.sending = false
}

export default send
