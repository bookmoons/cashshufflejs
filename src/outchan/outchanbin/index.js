/**
 * Outchanbin based implementation of Outchan.
 *
 * Uses an `Outchanbin` instance to deliver raw binary messages.
 *
 * Provide `Outchanbin` instance and a [protobufjs.Root][1] object for the
 * CashShuffle protocol to the constructor.
 *
 * [1]: https://dcode.io/protobuf.js/Root.html
 *
 * @module cashshuffle/outchan/outchanbin
 */

import OutchanbinOutchan from './main'
import send from './send'

Object.assign(OutchanbinOutchan.prototype, {
  send
})

Object.freeze(OutchanbinOutchan)

export default OutchanbinOutchan
