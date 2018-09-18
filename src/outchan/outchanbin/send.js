import { BusyError } from '../../error'
import { normalizeProtobufBytes } from '../../util'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (priv.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageBytesDenormal = priv.protocol.Packets.encode(message).finish()
  const messageBytes = normalizeProtobufBytes(messageBytesDenormal)
  const messageBuffer = messageBytes.buffer
  await priv.outchanbin.send(messageBuffer)
  priv.sending = false
}

export default send
