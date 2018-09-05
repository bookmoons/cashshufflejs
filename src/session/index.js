/** @module cashshuffle/session */

import Session from './main'
import affix from './affix'
import announce from './phase/announce'
import encryptLayered from './adjunct/layered'
import gatherAnnounce from './gather/announce'
import messageAnnounce from './message/announce'
import packageSignedPacket from './package'
import sign from './sign'
import validateAnnounce from './validate/announce'

Object.assign(Session.prototype, {
  affix,
  announce,
  encryptLayered,
  gatherAnnounce,
  messageAnnounce,
  packageSignedPacket,
  sign,
  validateAnnounce
})

export default Session
