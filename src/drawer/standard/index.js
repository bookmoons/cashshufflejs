/**
 * Standard message drawer.
 *
 * Provide inchan and receiver to constructor.
 *
 * @module cashshuffle/drawer/standard
 */

import Drawer from './main'
import start from './start'
import stop from './stop'
import watch from './watch'

Object.assign(Drawer.prototype, {
  start,
  stop
})

Object.defineProperty(Drawer.prototype, 'watch', {
  get: watch
})

export default Drawer
