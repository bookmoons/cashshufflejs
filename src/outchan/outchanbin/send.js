import { BusyError } from '../../error'
import { normalizeProtobufBytes } from '../../aid/normalize'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (priv.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageBytesDenormal = priv.protocol.Packets.encode(message).finish()
  const messageBytes = normalizeProtobufBytes(messageBytesDenormal)
  await priv.outchanbin.send(messageBytes)
  priv.sending = false
}

export default send
