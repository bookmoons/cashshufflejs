/**
 * File based implementation of Logchan.
 *
 * Uses Node.js [fs][1] module to log to file.
 *
 * Provide log file path to constructor.
 *
 * [1]: https://nodejs.org/dist/latest/docs/api/fs.html
 *
 * @module cashshuffle/logchan/file
 *
 * @example
import FileLogchan from 'cashshuffle/logchan/file'
const log = new Logchan('/home/user/.cashshuffle/log')

async function run () {
  await log.send('Starting run')
}

run()
 */

import FileLogchan from './main'
import send from './send'

Object.assign(FileLogchan.prototype, {
  send
})

export default FileLogchan
