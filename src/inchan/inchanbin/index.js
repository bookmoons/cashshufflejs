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

import InchanbinInchan from './main'
import receive from './receive'

Object.assign(InchanbinInchan.prototype, {
  receive
})

Object.freeze(InchanbinInchan)

export default InchanbinInchan
