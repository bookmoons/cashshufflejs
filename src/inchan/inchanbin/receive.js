import { BusyError } from '/error'
import { transferDecodeSigned } from '/aid/code'
import privs from './privs'

/**
 * @memberof module:cashshuffle/inchan/inchanbin.InchanbinInchan
 *
 * @throws {FormatError} If received binary message fails to parse.
 */
async function receive () {
  const priv = privs.get(this)
  if (priv.receiving) throw new BusyError('Another receive call is running')
  priv.receiving = true
  const messageEncoded = await priv.inchanbin.receive()
  const message = transferDecodeSigned(priv.protocol, messageEncoded)
  priv.receiving = false
  return message
}

export default receive
