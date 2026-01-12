<script setup lang="ts">
const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
</script>

<template>
  <div><i-ep-edit />{{ count }}</div>
  <el-button @click="counterStore.increment">+1</el-button>
</template>
