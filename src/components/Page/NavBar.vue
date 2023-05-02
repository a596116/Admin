<template>
  <div class="theme flex h-[70px] items-center justify-between bg-hd-Bg px-5 py-3">
    <div class="flex items-center justify-center">
      <section
        @click="menuStore.toggleMenu"
        class="mr-3 cursor-pointer duration-200 hover:-translate-y-1"
        :class="{ 'rotate-180': menuStore.isMenuCollapse }">
        <svg-icon name="menu-alt" class="h-8 w-8 text-hd-Text"></svg-icon>
      </section>

      <Breadcrumb
        class="hidden md:block"
        :class="{ 'md:hidden': !menuStore.isBreadcrumbCollapse }" />
    </div>

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
