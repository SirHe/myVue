import createElement from './createElement'
import patchVnode from './patchVnode'
import vnode from './vnode'

export default (oldVnode, newVnode) => {
  // 说明不是虚拟节点，那么就包装成虚拟节点
  if (oldVnode.sel === undefined) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    )
  }
  if (oldVnode.sel === newVnode.sel) {
    // 1.如果新节点是文本节点（没有children）
    patchVnode(oldVnode, newVnode)
    // 2.
  } else {
    // 如果标签名称不一样，可以直接暴力拆除重建
    let newVnodeElm = createElement(newVnode)

    // 获取旧节点
    let oldVnodeElm = oldVnode.elm

    // 创建新节点
    if (newVnodeElm) {
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
    }

    // 删除旧节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}
