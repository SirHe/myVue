export default (sel, data, children, text, elm) => {
  let key = data.key
  return {
    sel, // 节点dom标签名称
    data,
    children,
    text,
    elm, // 真实节点dom对象
    key,
  }
}
