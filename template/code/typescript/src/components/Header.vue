<script setup lang="ts">
import { account } from '@/stores'
import { useRouter } from 'vue-router'

const accountStore = account()
const router = useRouter()
function logout() {
  accountStore.logout()
  router.push('/login')
}
</script>

<template>
  <a-layout-header theme="light">
    <div class="block"></div>
    <div class="block">
      <a-dropdown>
        <div><a-avatar /> {{ accountStore.user_info?.userName || '-' }}</div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/user-info"> 个人中心 </router-link>
            </a-menu-item>
            <a-menu-item>
              <a @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.ant-layout-header[theme*='light'] {
  background: #fff;
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
}
</style>
