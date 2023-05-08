<template>
  <div class="flex items-center justify-center w-full h-full">
    <Vue3Lottie :animation-data="DashBoard" height="100%" width="100%" class="block" />
  </div>
</template>

<script setup lang="ts">
import DashBoard from '@/assets/json/DashBoard.json'
</script>

<style scoped></style>
