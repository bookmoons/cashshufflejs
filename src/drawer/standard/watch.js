import privs from './privs'

function watch () {
  const priv = privs.get(this)
  if (priv.watch) return priv.watch
  priv.watch = new Promise(function executeWatchPromise (resolve, reject) {
    priv.resolveWatch = resolve
    priv.rejectWatch = reject
  })
  return priv.watch
}

export default watch
