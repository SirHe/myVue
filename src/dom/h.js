import vnode from './vnode'

export default (sel, data, params) => {
  if (typeof params === 'string') {
    return vnode(sel, data, undefined, params, undefined)
  } else if (Array.isArray(params)) {
    let children = []
    for (let item of params) {
      children.push(item)
    }
    return vnode(sel, data, children, undefined, undefined)
  }
}
