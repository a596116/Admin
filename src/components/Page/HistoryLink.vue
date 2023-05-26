<template>
  <main class="mx-6 mb-2 bg-hd-Bg-1" v-show="menuStore.historyMenus.length">
    <div
      class="grid justify-start grid-flow-col gap-3 px-4 overflow-hidden rounded-lg"
      :class="{ 'pt-6': menuStore.isBreadcrumbCollapse }">
      <div
        :to="{ name: link.route }"
        v-for="(link, index) in menuStore.historyMenus"
        :key="index"
        class="box-border flex items-center px-2 py-1 text-sm duration-300 border rounded-lg shadow-sm hover:bg-hd-Color group"
        :class="{
          'bg-hd-Color text-white': route.name === link.route,
          'bg-white text-hd-Text': route.name !== link.route,
        }"
        @click.stop.middle.prevent="menuStore.removeHistoryMenu(link)">
        <Anchor :to="{ name: link.route }" :text="link.title" class="group-hover:text-white" />
        <svg-icon
          name="close"
          class="w-4 h-4 ml-1 duration-150 cursor-pointer hover:text-hd-HoverColor"
          @click="menuStore.removeHistoryMenu(link)"></svg-icon>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
const route = useRoute()
</script>

<style scoped lang="scss">
main > div {
  // box-shadow: 5px 5px 14px #a7aaad, -5px -5px 14px #ffffff;
}
</style>
