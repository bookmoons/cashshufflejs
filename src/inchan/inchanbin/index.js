/**
 * Inchanbin based implementation of Inchan.
 *
 * Uses an `Inchanbin` instance to receive raw binary messages.
 *
 * Provide `Inchanbin` instance to constructor.
 * Await `init` before using.
 *
 * @module cashshuffle/inchan/inchanbin
 */

import Inchan from './main'
import init from './init'
import receive from './receive'

Object.assign(Inchan.prototype, {
  init,
  receive
})

export default Inchan
