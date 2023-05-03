<template>
  <el-tooltip v-if="!isEmpty(content)" effect="dark" :content="content" placement="top">
    <button
      v-if="hasValid"
      v-permission="{
        currentTag: `${tag}`,
        path: `${String(route.name)}`,
        effect: 'disabled',
      }"
      :size="size || defaultSize"
      :loading="loading"
      :disabled="isDisabled"
      class="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-primary text-primary disabled:cursor-not-allowed disabled:opacity-30"
      @click="emit('on-submit')">
      <svg-icon :name="icon" class="h-[18px] w-[18px]"></svg-icon>
    </button>

    <el-button
      v-else
      :size="size || defaultSize"
      :icon="icon"
      :loading="loading"
      circle
      @click="emit('on-submit')" />
  </el-tooltip>
  <div v-else>
    <button
      v-if="hasValid"
      v-permission="{
        currentTag: `${tag}`,
        path: `${String(route.name)}`,
        effect: 'disabled',
      }"
      :size="size || defaultSize"
      :loading="loading"
      :disabled="isDisabled"
      class="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-primary text-primary hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
      :class="{
        'text-custom-gray-100': tag === 'delete',
      }"
      @click="emit('on-submit')">
      <svg-icon :name="icon" class="h-[18px] w-[18px]"></svg-icon>
    </button>

    <el-button
      v-else
      :size="size || defaultSize"
      :icon="icon"
      :loading="loading"
      circle
      @click="emit('on-submit')" />
  </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { useRoute } from 'vue-router'

const emit = defineEmits(['on-submit'])
const props = defineProps({
  type: { type: String, default: 'print' },
  size: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  hasValid: { type: Boolean, default: true },
  isDisabled: { type: Boolean, default: false },
})
const route = useRoute()
const buttonMap = {
  print: {
    content: '列印',
    tag: 'print',
    defaultSize: 'small',
    icon: 'printer',
  },
  import: {
    content: '導入',
    tag: 'import',
    defaultSize: 'default',
    icon: 'upload',
  },
  export: {
    content: '導出',
    tag: 'download',
    defaultSize: 'small',
    icon: 'download',
  },
  edit: {
    content: '編輯',
    tag: 'admin',
    defaultSize: 'small',
    icon: 'edit',
  },
  delete: {
    content: '',
    tag: 'admin',
    defaultSize: 'small',
    icon: 'delete',
  },
}
const { content, tag, defaultSize, icon } = buttonMap[props.type]
</script>
