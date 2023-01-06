<script setup>
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
// import { ConfigProvider } from 'ant-design-vue'

// 动态主题色
// https://www.antdv.com/components/config-provider-cn
// ConfigProvider.config({
//   theme: {
//     // https://github.com/vueComponent/ant-design-vue/blob/main/components/style/themes/default.less
//     primaryColor: '#1890ff'
//   }
// })
</script>

<template>
  <a-config-provider :locale="zh_CN">
    <router-view />
  </a-config-provider>
</template>

<style lang="less" scoped></style>
