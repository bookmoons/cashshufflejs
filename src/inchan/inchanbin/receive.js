import { BusyError, FormatError } from '../../error'
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
  const messageBytes = await priv.inchanbin.receive()
  let message
  try {
    message = priv.Signed.decode(messageBytes)
  } catch (e) {
    throw new FormatError(
      { cause: e, info: { messageBytes } },
      'Invalid binary message'
    )
  }
  priv.receiving = false
  return message
}

export default receive
