<template>
  <main class="relative mx-auto flex h-full p-6 max-w-[1500px] flex-col">
    <!-- header -->
    <header v-if="showHeader" class="flex px-4 py-2 mb-4 border-b text-hd-text">
      <el-button type="default" @click="handleGoBack">
        <svg-icon name="arrow-left"></svg-icon>
      </el-button>
    </header>

    <!-- 表單 -->
    <slot name="form" />

    <!-- footer -->
    <div class="sticky bottom-0 right-0 w-full mt-auto" style="z-index: 9">
      <FooterFormManage
        v-if="showFooter"
        class="mt-auto"
        :disable="disable"
        :is-single-page="isSinglePage"
        @on-submit="emit('on-submit')">
        <template #alert>
          <span class="px-3 text-sm tracking-widest text-red-400">{{ alertText }}</span>
        </template>
      </FooterFormManage>
    </div>
    <!-- 彈窗 -->
  </main>
</template>
<script setup lang="ts">
// ----------- props -----------
const props = defineProps({
  disable: { type: Boolean, default: false },
  showHeader: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  alertText: { type: String, default: '' },
  isSinglePage: { type: Boolean, default: false },
})

// ----------- emits -----------
const emit = defineEmits(['on-submit'])

const router = useRouter()

const handleGoBack = () => {
  if (window.history.state.back) {
    router.back()
  }
}
</script>
