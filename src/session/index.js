/**
 * CoinShuffle session.
 *
 * CashShuffle is an extension to [CoinShuffle][1].
 * The CoinShuffle session is the core of the CashShuffle logic.
 * Executes a CoinShuffle session.
 *
 * [1]: http://crypsys.mmci.uni-saarland.de/projects/CoinShuffle/
 *
 * @module cashshuffle/session
 */

import Session from './main'
import messageAnnounce from './message/announce'
import sign from './sign'

Object.assign(Session.prototype, {
  messageAnnounce,
  sign
})

export default Session
