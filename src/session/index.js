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
import affix from './affix'
import gatherAnnounce from './gather/announce'
import messageAnnounce from './message/announce'
import packageSignedPacket from './package'
import sign from './sign'
import validateAnnounce from './validate/announce'

Object.assign(Session.prototype, {
  affix,
  gatherAnnounce,
  messageAnnounce,
  packageSignedPacket,
  sign,
  validateAnnounce
})

export default Session
