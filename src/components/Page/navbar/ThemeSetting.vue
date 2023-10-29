<template>
  <div>
    <el-tooltip effect="dark" content="主題" placement="bottom-end">
      <svg-icon
        name="setting"
        class="w-6 h-6 duration-200 cursor-pointer hover:scale-105 hover:text-hd-primary-hover"
        @click="themeSettingDrawer = true"></svg-icon>
    </el-tooltip>
    <el-drawer
      v-model="themeSettingDrawer"
      title="Theme Setting"
      :with-header="false"
      :size="300"
      class="bg-hd-bg-1">
      <div class="flex flex-col justify-center p-8 text-lg">
        <span class="m-auto mb-3">主題設定</span>
        <!-- <div class="my-5">
          <span class="mx-3 text-hd-black1">主題顏色</span>
          <el-color-picker
            v-model="themeColor"
            :predefine="themeColorList"
            @active-change="changeThemeColor" />
        </div> -->
        <div class="my-5">
          <span class="mx-3">麵包屑</span>
          <el-switch
            v-model="menuStore.isBreadcrumbCollapse"
            class="ml-2"
            active-text="開"
            inactive-text="關"
            @change="menuStore.toggleBreadcrumb"
            size="large" />
        </div>
        <div class="my-5">
          <span class="mx-3">歷史紀錄</span>
          <el-switch
            v-model="menuStore.isHistoryCollapse"
            class="ml-2"
            active-text="開"
            inactive-text="關"
            @change="menuStore.toggleHistoryLink"
            size="large" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
// 主題設定
const themeSettingDrawer = ref<boolean>(false)
const themeColor = ref<string>(storage.get('themeColor') || '#fdcb6e')
const themeColorList = ref<string[]>(['#fdcb6e', '#3DCAE0'])
const el: HTMLElement = document.documentElement
const el1: HTMLElement = document.documentElement
getComputedStyle(el).getPropertyValue(`--hd-theme-color`)
el.style.setProperty('--hd-theme-color', themeColor.value)
getComputedStyle(el1).getPropertyValue(`--hd-theme-hover-color`)
el1.style.setProperty('--hd-theme-hover-color', themeColor.value + '80')

const changeThemeColor = (color: string): void => {
  storage.set('themeColor', color)
  el.style.setProperty('--hd-theme-color', color)
  el1.style.setProperty('--hd-theme-hover-color', color + '80')
}
</script>
<style scoped lang="scss">
:deep(.el-switch__label) {
  @apply text-hd-white-50;
}
:deep(.el-switch__label.is-active) {
  @apply text-hd-primary-active;
}
</style>
