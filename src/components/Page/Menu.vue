<template>
  <el-menu
    :collapse="menuStore.isMenuCollapse"
    :default-active="active_menu"
    class="admin-menu"
    :unique-opened="true">
    <div class="flex h-[70px] w-full items-center justify-center px-2 py-3">
      <svg-icon
        :name="menuStore.isMenuCollapse ? 'logo1' : 'logo'"
        class="h-[45px] w-full"
        @click="router.push({ name: 'admin/home' })"></svg-icon>
    </div>

    <div class="mt-4" v-for="(menu, index) in menuStore.menus" :key="index">
      <el-sub-menu v-if="menu.children?.length != 1" :index="menu.title!">
        <template #title>
          <section class="hidden bg-transparent md:block">
            <svg-icon :name="menu.icon" class="h-6 w-6"></svg-icon>
          </section>
          <span class="m-4 md:m-7">{{ menu.title }}</span>
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
        <section class="hidden bg-transparent md:block">
          <svg-icon :name="menu.icon" class="h-6 w-6"></svg-icon>
        </section>
        <span class="m-4 md:m-8">{{ menu.children[0].title }}</span>
      </el-menu-item>
    </div>
  </el-menu>
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
    active_menu.value = route.path.split('/')[2]
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.admin-menu {
  transition: width 0.3s ease-in-out;
  z-index: 200;
  @apply min-h-screen max-w-[130px] overflow-hidden border-0 bg-hd-Bg p-4 md:max-w-[250px];

  * {
    @apply bg-hd-Bg;
  }
}
// Menu
.el-sub-menu__title,
.el-menu-item {
  @apply rounded-lg;
  span,
  svg {
    background-color: transparent !important;
    color: var(--hd-text);
    letter-spacing: 8px;
    transition: 0.3s ease-in-out !important;
  }

  &:hover,
  &.is-active {
    @apply bg-white shadow-md;
    span,
    svg,
    * {
      color: var(--hd-hover-text) !important;
      @apply text-hd-HoverText;
    }
  }
}

.is-active .el-sub-menu__title * {
  color: var(--hd-color) !important;
}

.form-container input::placeholder {
  color: #fff !important;
}

.el-menu.el-menu--collapse {
  @apply w-0;
}

@media (min-width: 768px) {
  .admin-menu.el-menu--collapse {
    width: 90px;
  }
}
</style>
