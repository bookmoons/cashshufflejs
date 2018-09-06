/** @module cashshuffle/session */

import Session from './main'
import affix from './affix'
import announce from './phase/announce'
import decryptOutputList from './adjunct/decrypt'
import encryptLayered from './adjunct/layered'
import gatherAnnounce from './gather/announce'
import gatherFinalOutput from './gather/finaloutput'
import gatherOutputList from './gather/outputlist'
import messageAnnounce from './message/announce'
import messageDigest from './message/digest'
import messageFinalOutput from './message/finaloutput'
import messageOutputList from './message/outputlist'
import output from './phase/output'
import packageSignedPacket from './package'
import shuffle from './phase/shuffle'
import sign from './sign'
import validateAnnounce from './validate/announce'
import validateFinalOutput from './validate/finaloutput'
import validateOutputList from './validate/outputlist'

Object.assign(Session.prototype, {
  affix,
  announce,
  decryptOutputList,
  encryptLayered,
  gatherAnnounce,
  gatherFinalOutput,
  gatherOutputList,
  messageAnnounce,
  messageDigest,
  messageFinalOutput,
  messageOutputList,
  output,
  packageSignedPacket,
  shuffle,
  sign,
  validateAnnounce,
  validateFinalOutput,
  validateOutputList
})

export default Session
