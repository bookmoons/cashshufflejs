import loadModule from './loadmod'

/**
 * Dynamically load the default export of a module.
 *
 * @param {string} path - Module path.
 *
 * @return The default export of the named module.
 */
async function loadDefault (path) {
  const module = await loadModule(path)
  const defaultExport = module.default
  return defaultExport
}

export default loadDefault
