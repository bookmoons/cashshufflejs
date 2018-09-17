/**
 * Dynamically load a module.
 *
 * Uses the `import()` syntax from the [dynamic import proposal][1].
 *
 * [1]: https://github.com/tc39/proposal-dynamic-import
 *
 * @param {string} path - Module path.
 *
 * @return {object} The loaded module.
 */
async function loadModule (path) {
  const module = await import(path)
  return module
}

export default loadModule
