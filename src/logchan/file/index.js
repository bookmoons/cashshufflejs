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
 * import Logchan from 'cashshuffle/logchan/file'
 * const logchan = new Logchan('/home/user/.cashshuffle/log')
 * logchan.send('Starting run')
 */

import Logchan from './main'
import send from './send'

Object.assign(Logchan, {
  send
})

export default Logchan
