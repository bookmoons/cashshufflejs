/**
 * Distribute Logchan.
 *
 * Duplicates message to a set of logchans.
 *
 * @module cashshuffle/logchan/distribute
 *
 * @example
import ConsoleLogchan from 'cashshuffle/logchan/console'
import FileLogchan from 'cashshuffle/logchan/file'
import DistributeLogchan from 'cashshuffle/logchan/distribute'

const logConsole = new ConsoleLogchan()
const logFile = new FileLogchan('/home/user/.cashshuffle/log')
const log = new DistributeLogchan([ logConsole, logFile ])

async function run () {
  await log.send('Starting run')
}

run()
 */

import DistributeLogchan from './main'
import send from './send'

Object.assign(DistributeLogchan.prototype, {
  send
})

export default DistributeLogchan
