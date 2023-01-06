import axios from '@/api'
import type { AxiosResponse } from 'axios'

export type LoginResult = {
  userName: string
  realName: string
  menus: string[]
  roles: string[]
}
/**
 * 登录
 * @returns {Promise<AxiosResponse<LoginResult>>}
 */
export const doLogin = (params: { username: string; password: string }): Promise<AxiosResponse<LoginResult>> => {
  return axios.post(`/account/login`, params)
}

export enum CaptchaMode {
  LOGIN = 'LOGIN',
  RESET_PASSWORD = 'RESET_PASSWORD',
  REGISTER = 'REGISTER',
  VERIFY = 'VERIFY'
}
/**
 * 发送验证码
 * @returns {Promise<AxiosResponse<void>>}
 */
export const getCaptcha = (params: { receiver: string; mode: CaptchaMode }): Promise<AxiosResponse<void>> => {
  return axios.post(`/account/captcha`, {}, { params })
}

/**
 * 通过验证码重置密码
 * @returns {Promise<AxiosResponse<void>>}
 */
export const resetPasswordByCaptcha = (params: {
  password: string
  password_confirm: string
  receiver: string
  code: string
}) => {
  return axios.put('/account/password_reset', params)
}

/**
 * 退出登录
 * @returns {Promise<AxiosResponse<void>>}
 */
export const doLogout = (): Promise<AxiosResponse<void>> => {
  return axios.post(`/account/logout`)
}
