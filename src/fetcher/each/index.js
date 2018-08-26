/**
 * 1 message from each fetcher.
 *
 * Fetches 1 message from inbox.
 *
 * @module cashshuffle/fetcher/each
 */

import Fetcher from './main'
import fetch from './fetch'

Object.assign(Fetcher.prototype, {
  fetch
})

export default Fetcher
