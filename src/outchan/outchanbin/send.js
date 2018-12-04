import { BusyError } from '/error'
import { transferEncodePackets } from '/aid/code'
import privs from './privs'

async function send (message) {
  const priv = privs.get(this)
  if (priv.sending) throw new BusyError('Another send call is running')
  priv.sending = true
  const messageEncoded = transferEncodePackets(priv.protocol, message)
  await priv.outchanbin.send(messageEncoded)
  priv.sending = false
}

export default send
