<template>
  <main class="mx-6 mb-2 bg-hd-Bg-1" v-show="menuStore.historyMenus.length">
    <div
      class="grid justify-start grid-flow-col gap-3 px-4 overflow-hidden rounded-lg"
      :class="{ 'pt-6': menuStore.isBreadcrumbCollapse }">
      <div
        :to="{ name: link.route }"
        v-for="(link, index) in menuStore.historyMenus"
        :key="index"
        class="box-border flex px-2 py-1 text-sm duration-300 border rounded-lg shadow-sm hover:bg-hd-Color to-gray-600 group"
        :class="{
          'bg-hd-Color text-white': route.name === link.route,
          'bg-white': route.name !== link.route,
        }"
        @click.middle="menuStore.removeHistoryMenu(link)">
        <Anchor :to="link.route" :text="link.title" class="group-hover:text-white" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
const route = useRoute()
console.log(route.name)
</script>

<style scoped lang="scss">
main > div {
  // box-shadow: 5px 5px 14px #a7aaad, -5px -5px 14px #ffffff;
}
</style>
