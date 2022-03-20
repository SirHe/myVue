class Vue {
  constructor(options) {
    this.$options = options
    this.$watchEvent = {}
    if (typeof options.beforeCreate === 'function') {
      options.beforeCreate.bind(this)()
    }
    this.$data = options.data
    // 对data中的数据进行劫持
    this.proxyData()

    this.observe()
    if (typeof options.created === 'function') {
      options.created.bind(this)()
    }
    if (typeof options.beforeMount === 'function') {
      options.beforeMount.bind(this)()
    }
    this.$el = document.querySelector(options.el)
    this.compile(this.$el)
    if (typeof options.mounted === 'function') {
      options.mounted.bind(this)()
    }
  }

  // data中的数据和this实例中的保持一致
  proxyData() {
    for (let key in this.$data) {
      // 通过属性劫持的方式，将data中的数据添加到this实例身上
      // 同时this实例身上的属性修改时，data中的数据也会跟着改变
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(val) {
          this.$data[key] = val
        },
      })
    }
  }

  compile(node) {
    node.childNodes.forEach((item) => {
      if (item.nodeType === 1) {
        // 处理click事件
        if (item.hasAttribute('@click')) {
          // 获取事件名称
          let eventName = item.getAttribute('@click').trim()
          // 给真正dom元素添加click事件
          item.addEventListener('click', (e) => {
            this.$options.methods[eventName].bind(this)(e)
          })
        }

        // 判断元素节点是否添加了v-model
        if (item.hasAttribute('v-model')) {
          let vmKey = item.getAttribute('v-model').trim()
          if (this.hasOwnProperty(vmKey)) {
            item.value = this[vmKey]
            // console.log(vmKey, this[vmKey])
            item.addEventListener('input', (e) => {
              this[vmKey] = item.value
            })
          }
        }

        if (item.childNodes.length > 0) {
          this.compile(item)
        }
      }
      // 文本节点
      if (item.nodeType === 3) {
        let reg = /\{\{(.*?)\}\}/g
        let text = item.textContent

        // 将{{}}中的变量替换成data中的数据
        item.textContent = text.replace(reg, (match, vmKey) => {
          vmKey = vmKey.trim()

          if (this.hasOwnProperty(vmKey)) {
            let watch = new Watch(this, vmKey, item, 'textContent')

            if (this.$watchEvent[vmKey]) {
              this.$watchEvent[vmKey].push(watch)
            } else {
              this.$watchEvent[vmKey] = []
              this.$watchEvent[vmKey].push(watch)
            }
          }

          return this.$data[vmKey]
        })
      }
    })
  }

  observe() {
    for (let key in this.$data) {
      let value = this.$data[key]
      let _this = this
      Object.defineProperty(this.$data, key, {
        get() {
          return value
        },
        set(val) {
          value = val
          if (_this.$watchEvent[key]) {
            _this.$watchEvent[key].forEach((item) => {
              item.update()
            })
          }
        },
      })
    }
  }
}

class Watch {
  constructor(vm, key, node, attr) {
    // vue实例
    this.vm = vm
    // 数据变量名称
    this.key = key
    // dom对象
    this.node = node
    // 要操作dom属性
    this.attr = attr
  }
  // 使用数据更新视图
  update() {
    // 实际上是去操作dom，将data中的变量的值符给dom的content属性
    this.node[this.attr] = this.vm[this.key]
  }
}
