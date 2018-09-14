import { ExhaustionError } from '../../error'
import privs from './privs'

/**
 * @memberof module:cashshuffle/fetcher/persist.PersistFetcher
 *
 * @param {number} attempts - Maximum attempts. Positive integer.
 * @param {number} [timeout=null] - Maximum time to wait in milliseconds.
 *     `null` to wait forever.
 *
 * @return The fetched message.
 *
 * @throws {ExhaustionError} If attempts are exhausted without success.
 */
async function fetch (attempts, timeout = null) {
  const priv = privs.get(this)
  const inbox = priv.inbox
  for (let remaining = attempts; remaining > 0; remaining--) {
    const message = await inbox.watch(timeout)
    const accept = await priv.evaluator(message)
    if (accept) return message
  }
  throw new ExhaustionError(
    { info: { attempts } },
    'max attempts'
  )
}

export default fetch
