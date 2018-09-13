import privs from './privs'

/**
 * @memberof module:cashshuffle/fetcher/each.EachFetcher
 *
 * @param {number} [timeout=null] - Maximum time to wait in milliseconds.
 *     `null` to wait forever.
 *
 * @return {Array<*>} The fetched messages in same order as inboxes.
 */
async function fetch (timeout = null) {
  const priv = privs.get(this)
  const watchPromises = []
  for (const inbox of priv.inboxes) {
    const watchPromise = inbox.watch(timeout)
    watchPromises.push(watchPromise)
  }
  const fetchPromise = Promise.all(watchPromises)
  return fetchPromise
}

export default fetch
