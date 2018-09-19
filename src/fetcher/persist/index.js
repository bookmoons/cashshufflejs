/**
 * Persist fetcher.
 *
 * Fetches 1 message from 1 inbox.
 * Persists on failure for some specified maximum attempts.
 * Message acceptance determined by provided procedure.
 *
 * @module cashshuffle/fetcher/persist
 */

import PersistFetcher from './main'
import fetch from './fetch'

Object.assign(PersistFetcher.prototype, {
  fetch
})

Object.freeze(PersistFetcher)

export default PersistFetcher
