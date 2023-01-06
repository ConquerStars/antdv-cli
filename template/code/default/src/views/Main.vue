<script setup>
import Sider from '@/components/Sider.vue'
import Header from '@/components/Header.vue'
// import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import { account } from '@/stores'
import { useRouter } from 'vue-router'

const accountStore = account()
const router = useRouter()

const contentRef = ref()
function backTopTarget() {
  return contentRef.value.$el
}

// 无菜单权限 - 返回到登录页
if (!accountStore.user_info.menus.length) {
  router.replace('login')
}
</script>

<template>
  <a-layout>
    <Sider />
    <a-layout>
      <Header />
      <a-layout-content ref="contentRef">
        <router-view />
        <a-back-top :target="backTopTarget" :visibilityHeight="10" />
      </a-layout-content>
      <!-- <Footer /> -->
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.ant-layout-content {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
