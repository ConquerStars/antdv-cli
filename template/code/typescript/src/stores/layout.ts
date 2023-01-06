import { defineStore } from 'pinia'

export default defineStore('layout', {
  state: () => {
    return {
      collapsed: false
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'layout',
        storage: localStorage,
        paths: ['collapsed']
      }
    ]
  },
  // 注意：state的成员名称 与 getter成员名称不能相同
  getters: {
    // collapsed: (state) => state.collapsed,
  },
  // actions 支持async/await, actions之间方法互相调用直接用this访问即可
  actions: {
    toggleMenuCollapse() {
      this.collapsed = !this.collapsed
    }
  }
})
