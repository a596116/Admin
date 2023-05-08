<template>
  <suspense>
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </suspense>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style lang="scss">
@import '#/scss/base.scss';
</style>
