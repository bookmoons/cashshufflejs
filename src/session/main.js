import privs from './privs'

/**
 * @typedef {object} SessionParams
 * @memberof cashshuffle/session
 *
 * @prop {protobufjs.Root} protocol - Protocol definition.
 * @prop {ArrayBuffer} sessionId - Session identifier.
 * @prop {Signing} signingKeyPair - Participant signing key pair.
 *     Assumed ready for use.
 * @prop {Iterable<string>} inputs - Input addresses as strings.
 *     Will be deduplicated and ordered lexicographically.
 * @prop {number} amount - Amount to shuffle in satoshis.
 * @prop {Coin} coin - Bitcoin Cash network interface.
 */

/**
 * @memberof cashshuffle/session
 */
class Session {
  /**
   * @param {module:cashshuffle/session~SessionParams} params
   */
  constructor ({
    protocol,
    sessionId,
    signingKeyPair,
    inputs,
    amount,
    coin
  }) {
    const inputsSet = new Set(inputs)
    const inputsArray = [...inputsSet]
    inputsArray.sort()
    const priv = {
      protocol,
      sessionId,
      signingKeyPair,
      inputs: inputsArray,
      amount,
      coin
    }
    privs.set(this, priv)
  }
}

export default Session
