<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider
    :locale="zhCn"
    namespace="el"
    size="default"
    :z-index="3000"
  >
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
