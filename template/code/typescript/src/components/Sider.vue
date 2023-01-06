<script setup lang="ts">
import { ref } from 'vue'
import { MailOutlined, QqOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { layout } from '@/stores'

const layoutStore = layout()
const selectedKeys = ref<string[]>(['home'])
</script>

<template>
  <a-layout-sider :collapsed="layoutStore.collapsed" @collapse="() => layoutStore.toggleMenuCollapse()" collapsible>
    <div class="brand">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1 v-show="!layoutStore.collapsed">大恒数据</h1>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
      <a-menu-item key="home">
        <template #icon>
          <HomeOutlined />
        </template>
        <router-link to="/home"> 首页 </router-link>
      </a-menu-item>
      <a-sub-menu key="sub1" title="折叠菜单">
        <template #icon>
          <MailOutlined />
        </template>
        <a-menu-item-group key="g1" title="Item 1">
          <template #icon>
            <QqOutlined />
          </template>
          <a-menu-item key="1">Option 1</a-menu-item>
          <a-menu-item key="2">Option 2</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="less" scoped>
.brand {
  text-align: center;
  padding: 14px;
  overflow: hidden;
  height: calc(28px + 42px);
  img {
    height: 42px;
    vertical-align: middle;
  }
  h1 {
    margin: 0;
    font-weight: bold;
    color: #fff;
    display: inline-block;
    margin-left: 14px;
    vertical-align: middle;
    line-height: 42px;
  }
}
</style>
