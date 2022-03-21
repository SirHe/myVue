export default function createElement(vnode) {
  // 创建dom节点
  let domNode = document.createElement(vnode.sel)

  // 判断有没有子节点
  if (vnode.children === undefined) {
    // 没有子节点，说明是文本节点
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children)) {
    //有子节点，需要递归创建各个子节点
    for (let child of vnode.children) {
      let childNode = createElement(child)
      domNode.appendChild(childNode)
    }
  }

  // 补充elm属性
  vnode.elm = domNode
  return domNode
}
