<script setup></script>

<template>
  <div class="default-layout">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';
.default-layout {
  margin: @edge-padding-default;
  padding: @edge-padding-default;
  background-color: #fff;
  display: flex;
  min-height: calc(100% - calc(@edge-padding-default * 2));
  > :first-child {
    flex: 1;
  }
}
</style>
