/**
 * Add prefix Logchan.
 *
 * Adds static prefix to message.
 * Passes on to subsequent logchan.
 *
 * @module cashshuffle/logchan/prefix
 *
 * @example
import ConsoleLogchan from 'cashshuffle/logchan/console'
import PrefixLogchan from 'cashshuffle/logchan/prefix'
const logConsole = new ConsoleLogchan()
const log = new PrefixLogchan('Shuffler 1: ', logConsole)

async function run () {
  await log.send('Starting run')
}

run()
 */

import PrefixLogchan from './main'
import send from './send'

Object.assign(PrefixLogchan.prototype, {
  send
})

export default PrefixLogchan
