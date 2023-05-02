<template>
  <div class="border-b border-t bg-gray-50 p-3 shadow-sm" v-show="menuStore.historyMenus.length">
    <div class="grid grid-flow-col justify-start gap-3">
      <div
        :to="{ name: link.route }"
        v-for="(link, index) in menuStore.historyMenus"
        :key="index"
        class="hover:bg-hd-theme-color box-border flex rounded-sm border bg-white to-gray-600 px-2 py-2 text-sm shadow-sm duration-300 hover:text-white"
        :class="{ 'bg-hd-theme-color text-white': route.name == link.route }"
        @click.middle="menuStore.removeHistoryMenu(link)">
        <Anchor :to="link.route" :text="link.title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
const route = useRoute()
</script>

<style scoped></style>
