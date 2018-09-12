import privs from './privs'

/**
 * @memberof module:cashshuffle/fetcher/each
 */
class EachFetcher {
  /**
   * @param {Iterable<Inbox>} inboxes - Inboxes to fetch from.
   */
  constructor (inboxes) {
    const inboxesSet = new Set(inboxes)
    const priv = {
      inboxes: inboxesSet
    }
    privs.set(this, priv)
  }
}

export default EachFetcher
