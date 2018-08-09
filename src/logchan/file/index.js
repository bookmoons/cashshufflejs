/**
 * File based implementation of Logchan.
 *
 * Uses Node.js file system facilities to log to file.
 *
 * Provide log file path to constructor.
 *
 * @module cashshuffle/logchan/file
 *
 * @example
 * new Logchan('/home/user/.cashshuffle/log')
 */

import Logchan from './main'
import send from './send'

Object.assign(Logchan, {
  send
})

export default Logchan
