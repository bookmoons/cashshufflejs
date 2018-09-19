/**
 * Logging message discarder.
 *
 * Mentions each discarded message on a logging channel.
 *
 * @module cashshuffle/discarder/log
 */

import LogDiscarder from './main'
import submit from './submit'

Object.assign(LogDiscarder.prototype, {
  submit
})

Object.freeze(LogDiscarder)

export default LogDiscarder
