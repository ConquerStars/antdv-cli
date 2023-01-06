import { defineStore } from 'pinia'
import type { LoginResult } from '@/api/account'
import { doLogout } from '@/api/account'

function initUserInfo(): LoginResult {
  return {
    userName: '',
    realName: '',
    menus: [],
    roles: []
  }
}
export default defineStore('account', {
  state: () => {
    return {
      user_info: initUserInfo()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'account',
        storage: localStorage,
        paths: ['user_info']
      }
    ]
  },
  // 注意：state的成员名称 与 getter成员名称不能相同
  getters: {
    // userInfo: (state) => state.user_info,
  },
  // actions 支持async/await, actions之间方法互相调用直接用this访问即可
  actions: {
    setUserInfo(user_info: LoginResult) {
      this.user_info = user_info
    },
    logout() {
      doLogout()
      this.clearUserInfo()
    },
    clearUserInfo() {
      this.user_info = initUserInfo()
    }
  }
})
