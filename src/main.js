import h from './dom/h'
import patch from './dom/patch'

// let vnode1 = h('div', {}, 'hello')

// let vnode2 = h('ul', {}, [h('li', {}, 'a'), h('li', {}, 'b'), h('li', {}, 'c')])

// console.log(vnode2)

let container = document.querySelector('#app')
let btn = document.querySelector('#btn')

// 虚拟节点
// let vnode1 = h('ul', {}, 'hello')
// let vnode1 = h('div', {}, 'hello')
let vnode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'e' }, 'e'),
])

let vnode2 = h('ul', {}, [
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'd' }, 'd'),
])

patch(container, vnode1)

btn.addEventListener('click', () => {
  patch(vnode1, vnode2)
  // patch(container, vnode1)
})
