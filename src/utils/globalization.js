// 定义数据源
const message = {
  en: {
    msg: 'hello world',
  },
  ch: {
    msg: '你好 世界',
  },
}

// 定义切换变量
let locale = 'en'

// 定义赋值函数
function t(key) {
  return message[locale][key]
}

// 给变量赋值
let msg = t('msg')

console.log(msg)

locale = 'ch'

msg = t('msg')
console.log(msg)
