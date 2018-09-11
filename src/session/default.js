import bitcore from 'bitcore-lib-cash'

const defaultAttempts = 5
const defaultNetwork = bitcore.Networks.mainnet
const defaultTimeout = 5000 // 5 seconds

export {
  defaultAttempts,
  defaultNetwork,
  defaultTimeout
}
