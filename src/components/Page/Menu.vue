<template>
  <el-menu
    :collapse="!menuStore.isMenuCollapse"
    :default-active="active_menu"
    mode="vertical"
    class="admin-menu"
    :unique-opened="true">
    <div class="flex items-center justify-center w-full px-2 my-4 cursor-pointer">
      <svg-icon
        :name="menuStore.isMenuCollapse ? 'logo' : 'logo1'"
        class="h-[45px] w-full"
        @click="router.push({ name: 'admin' })"></svg-icon>
    </div>

    <div class="mr-2" v-for="(menu, index) in menuStore.menus" :key="index">
      <el-sub-menu v-if="menu.children?.length != 1" :index="menu.title!">
        <template #title>
          <section class="hidden md:block">
            <svg-icon :name="menu.icon" class="w-5 h-5"></svg-icon>
          </section>
          <span class="mx-2 md:mx-4 title">{{ menu.title }}</span>
        </template>
        <el-menu-item
          v-for="(cmenu, index) in menu.children"
          :key="index"
          :index="cmenu?.route?.split('/')[1]"
          @click="handle(menu, cmenu)">
          <span class="menu-title">{{ cmenu.title }}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item
        v-else
        :index="menu.children[0]?.route?.split('/')[1]"
        @click="handle(menu, menu.children![0])">
        <section class="hidden md:block">
          <svg-icon :name="menu.icon" class="w-5 h-5"></svg-icon>
        </section>
        <span class="mx-2 md:mx-4 title">{{ menu.children[0].title }}</span>
      </el-menu-item>
    </div>
  </el-menu>
  <div
    v-if="menuStore.isMenuCollapse"
    class="absolute top-0 left-0 z-10 w-full h-full bg-white/40 md:hidden"
    @click="menuStore.toggleMenu"></div>
</template>

<script setup lang="ts">
import type { IMenu } from '../../../types/menu'
import { useMenuStore } from '@/stores/menuStore'
import router from '@/router'
const route = useRoute()
const menuStore = useMenuStore()
const active_menu = ref(route.path.split('/')[2])

const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  router.push({ name: cmenu?.route })
  if (document.documentElement.scrollWidth <= 768) {
    menuStore.toggleMenu()
  }
}
watch(
  route,
  () => {
    active_menu.value = route.path.split('/')[1]
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.admin-menu {
  @apply left-0 top-0 z-[51] mx-2 my-4 h-[calc(100vh-32px)] overflow-hidden rounded-xl border-0 max-md:h-[calc(100vh-20px)] max-md:mt-[10px]
        max-md:absolute  max-w-[190px];
  transition: width 0.3s ease-in-out;
  * {
    @apply bg-hd-bg-1 text-hd-white-50;
  }
  // Menu
  :deep(.el-sub-menu__title),
  :deep(.el-menu-item) {
    @apply rounded-lg;
    span,
    svg {
      background-color: transparent !important;
      color: var(--hd-white-50);
      letter-spacing: 8px;
      transition: 0.3s ease-in-out !important;
    }

    &:hover,
    &.is-active {
      @apply text-hd-primary-hover;
      span,
      svg,
      * {
        @apply text-hd-primary-hover;
      }
    }
  }

  .is-active .el-sub-menu__title * {
    color: var(--hd-primary-hover) !important;
  }

  .form-container input::placeholder {
    color: #fff !important;
  }

  &.el-menu--collapse span,
  &.el-menu--collapse .el-sub-menu__icon-arrow {
    @apply hidden;
  }
}

@media (max-width: 768px) {
  .el-menu--collapse {
    width: 0px;
  }
}
</style>
