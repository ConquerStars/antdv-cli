export const actionDevice = (v) => {
  return {
    1: 'PC端',
    2: '移动端',
    3: '中间件',
    6: '其他'
  }[v]
}
