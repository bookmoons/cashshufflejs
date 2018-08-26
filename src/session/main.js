import privs from './privs'

/**
 * @memberof cashshuffle/session
 */
class Session {
  /**
   * @param {ArrayBuffer} sessionId - The session identifier.
   * @param {SigningKey} signingKey - Participant signing key.
   * @param {Iterable<string>} inputs - Input addresses as strings.
   *     Will be deduplicated and ordered lexicographically.
   * @param {number} amount - Amount to shuffle in satoshis.
   * @param {Coin} coin - Bitcoin Cash network interface.
   */
  constructor (
    sessionId,
    signingKey,
    inputs,
    amount,
    coin
  ) {
    const inputsSet = new Set(inputs)
    const inputsArray = [...inputsSet]
    inputsArray.sort()
    const priv = {
      sessionId,
      signingKey,
      inputs: inputsArray,
      amount,
      coin
    }
    privs.set(this, priv)
  }
}

export default Session
