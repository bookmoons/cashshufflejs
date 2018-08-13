import toArrayBuffer from '../../util/toarraybuffer'
import { BusyError } from '../../error'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (priv.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageBinaryView = priv.protocol.Signed.encode(message).finish()
  // Normalize to buffer. protobufjs can return Uint8Array or Buffer.
  const messageBuffer = Buffer.from(messageBinaryView)
  const messageBinary = toArrayBuffer(messageBuffer)
  await priv.outchanbin.send(messageBinary)
  priv.sending = false
}

export default send
