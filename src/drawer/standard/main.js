import privs from './privs'

class Drawer {
  constructor () {
    const priv = {
      drawing: false
    }
    privs.set(this, priv)
  }
}

export default Drawer
