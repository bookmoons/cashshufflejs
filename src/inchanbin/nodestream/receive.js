import { readTo } from 'promised-read'
import { terminatorByteLength, terminatorNodeBuffer } from '../../protocol'
import { BusyError } from '../../error'
import { nodeBufferToBytes } from '../../aid/convert'
import privs from './privs'

async function receive () {
  const priv = privs.get(this)
  if (priv.receiving) throw new BusyError('Another receive call is running')
  priv.receiving = true
  const frameNodeBuffer = await readTo(priv.stream, terminatorNodeBuffer)
  const frame = nodeBufferToBytes(frameNodeBuffer)
  const messageLength = frame.byteLength - terminatorByteLength
  const message = frame.slice(0, messageLength)
  priv.receiving = false
  return message
}

export default receive
