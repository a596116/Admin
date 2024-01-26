<template>
  <main
    class="relative z-[18] m-2 flex h-[50px] flex-col"
    :class="{ 'h-[65px]1': menuStore.isHistoryCollapse }">
    <div class="flex items-center justify-between py-1 overflow-hidden bg-transparent rounded-lg">
      <div class="flex items-center justify-center">
        <section
          @click="menuStore.toggleMenu"
          :class="{ 'rotate-180': menuStore.isMenuCollapse }"
          class="mr-3 text-xl duration-200 cursor-pointer center hover:scale-105 hover:text-hd-primary-hover">
          <svg-icon name="collapse"></svg-icon>
        </section>
        <Breadcrumb class="px-2 bg-transparent rounded-md breadcrumb" />
      </div>

      <div class="flex items-center justify-center">
        <FullScreen class="mr-5" />
        <ThemeSetting class="mr-5 max-sm:hidden" />
        <UserInfo />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
</script>
