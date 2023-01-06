export const usernameRegexp = new RegExp(/^[a-zA-Z\d_]{6,}$/) // 用户名称
export const phoneRegexp = new RegExp(/^1\d{10}$/) // 手机号码
export const emailRegexp = new RegExp(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/) // 邮箱
export const weakPswRegexp = new RegExp(/^(?!\d+$)(?![a-zA-Z]+$)[\dA-Za-z?><}{)(*&^%$#@!~)}|\\/,.[\]=-_+'";:]{6,18}$/) // 弱密码
export const captchaRegexp = new RegExp(/^[\d]{6}$/) // 6位验证码
