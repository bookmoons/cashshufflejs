/**
 * Inchanbin based implementation of Inchan.
 *
 * Uses an `Inchanbin` instance to receive raw binary messages.
 *
 * Provide `Inchanbin` instance and a [protobufjs.Root][1] object for the
 * CashShuffle protocol to the constructor.
 *
 * [1]: https://dcode.io/protobuf.js/Root.html
 *
 * @module cashshuffle/inchan/inchanbin
 */

import Inchan from './main'
import receive from './receive'

Object.assign(Inchan.prototype, {
  receive
})

export default Inchan
