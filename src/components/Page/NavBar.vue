<template>
  <main class="z-50 m-6">
    <div
      class="flex h-[70px] items-center justify-between bg-hd-Bg-1 rounded-lg overflow-hidden px-5 py-3">
      <!-- <Menu class="flex-1" /> -->

      <div class="flex items-center justify-center">
        <section
          @click="menuStore.toggleMenu"
          :class="{ 'rotate-180': menuStore.isMenuCollapse }"
          class="mr-3 text-xl duration-200 cursor-pointer hover:-translate-y-1 hover:text-hd-HoverColor">
          <svg-icon name="collapse"></svg-icon>
        </section>

        <admin-navbar-breadcrumb
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
    <transition name="top-slide-fade" mode="out-in">
      <Breadcrumb
        v-if="menuStore.isBreadcrumbCollapse"
        class="px-4 mt-1 rounded-md mx-14 bg-hd-Bg-1" />
    </transition>
  </main>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
</script>
<style scoped lang="scss">
main > div {
  box-shadow: 5px 5px 14px #a7aaad, -5px -5px 14px #ffffff;
}
</style>
