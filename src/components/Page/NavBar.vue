<template>
  <main class="relative z-50 m-2">
    <div
      class="flex h-[70px] items-center justify-between bg-hd-Bg-1 rounded-lg overflow-hidden px-5 py-3">
      <!-- <Menu class="flex-1" /> -->

      <div class="flex items-center justify-center">
        <section
          @click="menuStore.toggleMenu"
          :class="{ 'rotate-180': menuStore.isMenuCollapse }"
          class="mr-3 text-xl duration-200 cursor-pointer center hover:scale-105 hover:text-hd-HoverColor">
          <svg-icon name="collapse"></svg-icon>
        </section>
        <span class="center text-hd-Text">{{ pageTitle }}</span>
      </div>

      <div class="flex items-center justify-center">
        <FullScreen class="mr-5" />
        <ThemeSetting class="mr-5" />

        <!-- <notification class="mr-5" /> -->

        <UserInfo />
      </div>
    </div>
    <transition name="top-slide-fade" mode="out-in">
      <section v-if="menuStore.isBreadcrumbCollapse" class="absolute w-full px-8 mt-1">
        <Breadcrumb class="px-4 rounded-md breadcrumb bg-hd-Bg-1" />
      </section>
    </transition>
  </main>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
const route = useRoute()

const pageTitle = computed(() => {
  return route.meta.menu.title
})
</script>
<style scoped lang="scss">
main > div,
.breadcrumb {
  box-shadow: 0px 0px 14px #a7aaad;
}
</style>
