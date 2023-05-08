<template>
  <div class="theme m-6 fixed top-0 z-50 w-[calc(100%-48px)] shadow-lg">
    <div class="flex h-[70px] items-center justify-between bg-hd-Bg-1 rounded-lg px-5 py-3">
      <Menu class="flex-1" />

      <div class="flex items-center justify-center">
        <FullScreen class="mr-5" />
        <ThemeSetting class="mr-5" />

        <!-- <notification class="mr-5" /> -->

        <UserInfo />
      </div>
    </div>
    <transition name="top-slide-fade" mode="out-in">
      <Breadcrumb
        v-if="menuStore.isBreadcrumbCollapse"
        class="px-4 mt-1 rounded-md mx-14 bg-hd-Bg-1" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
</script>
