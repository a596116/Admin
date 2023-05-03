<template>
  <div class="theme flex h-[70px] items-center justify-between bg-hd-Bg-1 px-5 py-3 rounded-lg">
    <Menu class="flex-1" />
    <!-- <Breadcrumb
      class="hidden md:block"
      :class="{ 'md:hidden': !menuStore.isBreadcrumbCollapse }" />  -->

    <div class="flex items-center justify-center">
      <FullScreen class="mr-5" />
      <ThemeSetting class="mr-5" />

      <!-- <notification class="mr-5" /> -->

      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
</script>
