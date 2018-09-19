/**
 * 1 message from each fetcher.
 *
 * Fetches 1 message from each inbox.
 *
 * @module cashshuffle/fetcher/each
 */

import EachFetcher from './main'
import fetch from './fetch'

Object.assign(EachFetcher.prototype, {
  fetch
})

Object.freeze(EachFetcher)

export default EachFetcher
