<template>
  <main class="relative mx-auto flex h-full p-6 max-w-[1500px] flex-col">
    <!-- header -->
    <header v-if="showHeader" class="flex px-4 py-2 mb-4 border-b text-hd-text">
      <span>{{ title }}</span>
    </header>

    <!-- 表單 -->
    <slot name="form" />

    <!-- footer -->
    <div class="sticky bottom-0 right-0 w-full mt-auto" style="z-index: 9">
      <FooterFormManage v-if="showFooter" class="mt-auto" @on-submit="emit('on-submit')">
        <template #alert>
          <span class="px-3 text-sm tracking-widest text-red-400">{{ alertText }}</span>
        </template>
      </FooterFormManage>
    </div>
    <!-- 彈窗 -->
    <slot name="dialog" />
    <!-- 結果彈窗 -->
    <!-- <DialogResult
      :dialog-visible="propsDialogVisible"
      :title="dialogData.title"
      :sub-title="dialogData.subTitle"
      :icon="dialogData.icon"
      @on-close="emit('on-close')"
    >
      <div
        v-for="(content, index) in dialogData?.content"
        :key="index"
        class="mb-3"
      >
        {{ content }}
      </div>
    </DialogResult> -->
  </main>
</template>
<script setup lang="ts">
// ----------- props -----------
const props = defineProps({
  dialogData: { type: Object, default: {} },
  title: { type: String, default: '' },
  dialogVisible: { type: Boolean, default: false },
  showHeader: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  alertText: { type: String, default: '' },
})

// ----------- emits -----------
const emit = defineEmits(['on-submit', 'on-command', 'on-close', 'update:dialogVisible'])

// ----------- computed ----------
const propsDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (val) => {
    emit('update:dialogVisible', val)
  },
})
</script>
