/**
 * Log to console Logchan.
 *
 * Uses `console.log()` to output to console.
 *
 * @module cashshuffle/logchan/console
 *
 * @example
import ConsoleLogchan from 'cashshuffle/logchan/console'
const log = new ConsoleLogchan()

async function run () {
  await log.send('Starting run')
}

run()
 */

import ConsoleLogchan from './main'
import send from './send'

Object.assign(ConsoleLogchan.prototype, {
  send
})

Object.freeze(ConsoleLogchan)

export default ConsoleLogchan
