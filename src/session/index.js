/** @module cashshuffle/session */

import Session from './main'
import affix from './affix'
import announce from './phase/announce'
import broadcastOutput from './phase/output'
import checkEquivocation from './phase/equiv'
import decryptOutputList from './adjunct/decrypt'
import encryptLayered from './adjunct/layered'
import gatherAnnounce from './gather/announce'
import gatherDigest from './gather/digest'
import gatherFinalOutput from './gather/finaloutput'
import gatherOutputList from './gather/outputlist'
import messageAnnounce from './message/announce'
import messageDigest from './message/digest'
import messageFinalOutput from './message/finaloutput'
import messageOutputList from './message/outputlist'
import messageSignature from './message/signature'
import packageSignedPacket from './package'
import shuffle from './phase/shuffle'
import sign from './sign'
import validateAnnounce from './validate/announce'
import validateDigest from './validate/digest'
import validateFinalOutput from './validate/finaloutput'
import validateOutputList from './validate/outputlist'

Object.assign(Session.prototype, {
  affix,
  announce,
  broadcastOutput,
  checkEquivocation,
  decryptOutputList,
  encryptLayered,
  gatherAnnounce,
  gatherDigest,
  gatherFinalOutput,
  gatherOutputList,
  messageAnnounce,
  messageDigest,
  messageFinalOutput,
  messageOutputList,
  messageSignature,
  packageSignedPacket,
  shuffle,
  sign,
  validateAnnounce,
  validateDigest,
  validateFinalOutput,
  validateOutputList
})

export default Session
