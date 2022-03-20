import h from './dom/h'

let vnode1 = h('div', {}, 'hello')

let vnode2 = h('ul', {}, [h('li', {}, 'a'), h('li', {}, 'b'), h('li', {}, 'c')])

console.log(vnode2)
