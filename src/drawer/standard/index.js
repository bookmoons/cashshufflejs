/**
 * Standard message drawer.
 *
 * Provide inchan and receiver to constructor.
 *
 * @module cashshuffle/drawer/standard
 */

import StandardDrawer from './main'
import start from './start'
import stop from './stop'
import watch from './watch'

Object.assign(StandardDrawer.prototype, {
  start,
  stop
})

Object.defineProperty(StandardDrawer.prototype, 'watch', {
  get: watch
})

Object.freeze(StandardDrawer)

export default StandardDrawer
