export enum Device {
  PC = 1,
  MOBILE = 2,
  MIDDLEWARE = 3,
  OTHER = 6
}
export const actionDevice = (v: Device) => {
  return {
    [Device.PC]: 'PC端',
    [Device.MOBILE]: '移动端',
    [Device.MIDDLEWARE]: '中间件',
    [Device.OTHER]: '其他'
  }[v]
}
