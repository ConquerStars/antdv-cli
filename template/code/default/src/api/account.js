import axios from '@/api'

/**
 * 登录
 * @param {string} username
 * @param {string} password
 * @returns {Promise<AxiosResponse<{ userName: string, realName: string, menus: string[], roles: string[] }>>}
 */
export const doLogin = (params) => {
  return axios.post(`/account/login`, params)
}

/**
 * 发送验证码
 * @param {string} receiver 手机号
 * @param {string} mode 用途 LOGIN RESET_PASSWORD REGISTER VERIFY
 * @returns {Promise<AxiosResponse<void>>}
 */
export const getCaptcha = (params) => {
  return axios.post(`/account/captcha`, {}, { params })
}

/**
 * 通过验证码重置密码
 * @param {string} password
 * @param {string} password_confirm
 * @param {string} receiver
 * @param {string} code
 * @returns {Promise<AxiosResponse<void>>}
 */
export const resetPasswordByCaptcha = (params) => {
  return axios.put('/account/password_reset', params)
}

/**
 * 退出登录
 * @returns {Promise<AxiosResponse<void>>}
 */
export const doLogout = () => {
  return axios.post(`/account/logout`)
}
