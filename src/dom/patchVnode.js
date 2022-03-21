import createElement from './createElement'
import updateChildren from './updateChildren'

export default (oldVnode, newVnode) => {
  // 判断新节点是否有子节点
  if (newVnode.children === undefined) {
    // 判断新节点的文本 和 就节点的文本是否一样
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 新的节点有children，旧的有 diff算法的核心
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 新的有，旧的没有
      // 将旧真实节点清空
      oldVnode.elm.innerHTML = ''
      for (let child of newVnode.children) {
        let childDom = createElement(child)
        oldVnode.elm.appendChild(childDom)
      }
    }
  }
}
