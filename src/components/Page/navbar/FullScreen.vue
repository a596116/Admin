<template>
  <div>
    <el-tooltip effect="dark" content="全螢幕" placement="bottom-end">
      <div
        @click="fullScreen"
        class="hidden duration-200 cursor-pointer hover:scale-105 md:block hover:text-hd-primary-hover">
        <svg-icon name="full-exit" v-if="isFullScreen" class="w-8 h-8"></svg-icon>
        <svg-icon name="full" v-else class="w-8 h-8"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
const isFullScreen = ref<boolean>(false)
const fullScreen = () => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}
</script>
