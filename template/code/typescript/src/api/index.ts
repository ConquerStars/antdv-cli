import axios from 'axios'
import router from '@/router'

const service = axios.create({
  baseURL: `/api/v1`
})

export type Pagination<T> = {
  pages: number
  result: T
  total: number
}

service.interceptors.request.use(
  (config) => {
    // const accountStore = account()
    // config.headers && accountStore.Authorization && (config.headers['Authorization'] = accountStore.Authorization)
    return config
  },
  (error) => error
)

service.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error, error.response, error.status);
    const resp = error.response || {}
    const accountMaxTries = 5
    !resp.data && (resp.data = {})
    !error.data && (error.data = {})
    const headers = resp.headers || {}
    const accountTriesList = headers['x-account-tries'] ? headers['x-account-tries'] : []
    const accountTries = accountTriesList.length > 0 ? accountTriesList[0] : 0

    let defaultMsg = ''

    if (resp.status < 500) {
      // 请求异常
      defaultMsg = `请求出错了，请联系管理员！[${resp.status || 1000}]`
      if (resp.status === 401) {
        resp.data.message = '未登录或登录已过期，请重新登录'
        router.replace('/login')
      } else {
        switch (resp.data.code) {
          // case "1000": // 账户被锁定
          // case "1001": // 账户未注册
          case '1002':
            if (accountTries >= accountMaxTries) {
              resp.data.message = `当前账户因账户密码输入错误 ${accountMaxTries} 次已被锁定，请联系管理员`
            } else {
              resp.data.message = `您已输错 ${accountTries} 次密码，超过 ${accountMaxTries} 次账户将被锁定，您还可尝试 ${
                accountMaxTries - accountTries
              } 次。`
            }
            break
        }
      }
    } else {
      // 服务端异常
      defaultMsg = `服务异常，请稍后再试！[${resp.status || 1000}]`
    }
    throw {
      code: resp.status,
      data: resp.data.data,
      msg: resp.data.message || defaultMsg
    }
  }
)

export default service
