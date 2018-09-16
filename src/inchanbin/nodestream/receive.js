import { readTo } from 'promised-read'
import bufferToBytes from '../../util/tobytes/buffer'
import { terminatorByteLength, terminatorBuffer } from '../../protocol'
import { BusyError } from '../../error'
import privs from './privs'

async function receive () {
  const priv = privs.get(this)
  if (priv.receiving) throw new BusyError('Another receive call is running')
  priv.receiving = true
  const frameBuffer = await readTo(priv.stream, terminatorBuffer)
  const messageLength = frameBuffer.length - terminatorByteLength
  const messageBuffer = frameBuffer.slice(0, messageLength)
  const messageBinary = bufferToBytes(messageBuffer).buffer
  priv.receiving = false
  return messageBinary
}

export default receive
