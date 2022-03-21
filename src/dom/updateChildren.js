import createElement from './createElement'
import patchVnode from './patchVnode'

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key
}

export default (parentElm, oldCh, newCh) => {
  let oldStartIdx = 0 // 旧前
  let oldEndIdx = oldCh.length - 1 // 旧后
  let newStartIdx = 0 // 新前
  let newEndIdx = newCh.length - 1 // 新后

  // 元素
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]

  while (oldStartIdx < oldEndIdx && newStartIdx < newEndIdx) {
    if (oldStartVnode === undefined || oldEndVnode === undefined) {
      while (oldStartVnode === undefined) {
        oldStartVnode = oldCh[++oldStartIdx]
      }
      while (oldEndVnode === undefined) {
        oldEndVnode = oldCh[--oldEndIdx]
      }
    }
    if (sameVnode(oldStartVnode, newStartVnode)) {
      // 旧前与新前
      // 使用patchVnode对比更新
      patchVnode(oldStartVnode, newStartVnode)
      // 修正elm属性
      newStartVnode.elm = oldStartVnode.elm
      // 修正计数器
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
      console.log(1)
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 旧后与新后
      patchVnode(oldEndVnode, newEndVnode)
      newEndVnode.elm = oldEndVnode.elm
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
      console.log(2)
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 旧前与新后（左高右低）-> 画叉的顺序
      patchVnode(oldStartVnode, newEndVnode)
      newEndVnode.elm = oldStartVnode.elm
      // 除此之外，还需要移动位置（从新节点怎么复用旧节点的角度去考虑）
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)

      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
      console.log(3)
    } else if (sameVnode(newStartVnode, oldEndVnode)) {
      // 新前与旧后（右高左低）
      patchVnode(newStartVnode, oldEndVnode)
      newStartVnode.elm = oldEndVnode.elm
      // 移动位置
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      newStartVnode = newCh[++newStartIdx]
      oldEndVnode = oldCh[--oldEndIdx]
      console.log(4)
    } else {
      // 循环查找
      const keyMap = [] //这样一个map使得我们可以通过key来找vnode
      for (let i = oldStartIdx; i < oldEndIdx; i++) {
        let key = oldCh[i].key
        keyMap[key] = i
      }
      // 在旧节点中查找新前匹配节点
      let idxInOld = keyMap[newStartVnode.key]
      if (idxInOld) {
        // 找到了，说明可以复用
        let elmNode = oldCh[idxInOld]
        patchVnode(elmNode, newStartVnode)
        // oldCh中处理过的节点，设置为undefined
        oldCh[idxInOld] = undefined
        parentElm.insertBefore(elmNode, oldStartVnode.elm)
      } else {
        // 没找到，则需要重新创建
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      // 新前指针下移，说明这个地方已经处理了
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 结束循环，剩下新增和删除
  // 1、oldStartIdx > oldEndIdx
  // 2、newStartIdx > newEndIdx
  if (oldStartIdx > oldEndIdx) {
    const before = newCh[newEndIdx + 1]?.elm || null
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  }

  if (newStartIdx > newEndIdx) {
    // 删除老dom上多余的dom节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }
}
