<template>
  <el-tag round :color="formatColor">
    <p
      v-if="isEmpty(title)"
      class="text-white"
      :style="{
        paddingLeft: `${padding}px`,
        paddingRight: `${padding}px`,
      }">
      {{ status == 0 ? '停用' : '啟用' }}
    </p>

    <p
      v-else
      class="text-white"
      :style="{
        paddingLeft: `${padding}px`,
        paddingRight: `${padding}px`,
      }">
      {{ title }}
    </p>
  </el-tag>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash-es'

const props = defineProps({
  status: { type: [Number, String], default: '' },
  title: { type: String, default: '' },
  padding: { type: Number, default: 16 },
})

const formatColor = computed(() => {
  const colorMap = {
    0: '#F36666',
    1: '#bfccb5',
    2: '#ffcf73',
  }
  return colorMap[props.status] || colorMap[props.title]
})

const formatStatusClass = computed(() => {
  const statusClassMap = {
    0: 'custom-tag--alert',
    1: 'custom-tag--finish',
    2: 'custom-tag--process',
  }
  return statusClassMap[props.status]
})
</script>
