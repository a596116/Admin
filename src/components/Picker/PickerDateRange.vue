<template>
  <div>
    <span class="text-xs leading-6 tracking-widest text-gray-500">{{ labelText }}</span>
    <div class="flex items-center rounded-md">
      <el-date-picker
        ref="refDatePicker"
        v-model="propsDateValue"
        :disabled="disabled"
        :disabled-date="disabledDate"
        :shortcuts="state.shortcuts"
        :clearable="clearable"
        :teleported="teleported"
        :size="(size as any)"
        type="daterange"
        range-separator="-"
        start-placeholder="開始日期"
        end-placeholder="结束日期"
        class="date-picker w-[300px]"
        @change="actions.handleChange">
      </el-date-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
// ----------- props -----------
const props = defineProps({
  size: { type: String, default: 'default' },
  labelText: { type: String, default: '' },
  dateRange: { type: Array, default: () => [] },
  clearable: { type: Boolean, default: true },
  isSelectBefore: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  teleported: { type: Boolean, default: false },
})
const emit = defineEmits(['date-change'])
const refDatePicker = ref(null)

const disabledDate = (time) => {
  const date = new Date()
  if (!props.isSelectBefore) return
  return time.getTime() > Date.now()
}
// ----------- computed ----------
const propsDateValue = computed({
  get: () => props.dateRange,
  set: (val) => {
    actions.handleChange(val)
  },
})
const state = ref({
  shortcuts: [
    {
      text: '今天',
      value: () => {
        const end = new Date()
        const start = new Date()
        return [start, end]
      },
    },
    {
      text: '昨天',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        end.setTime(end.getTime() - 3600 * 1000 * 24)
        return [start, end]
      },
    },
    {
      text: '前7天',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    },
    {
      text: '前90天',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      },
    },
    {
      text: '這一週',
      value: () => {
        const end = new Date()
        const start = new Date()
        var thisDay = start.getDay()
        var thisDate = start.getDate()
        if (thisDay != 0) {
          start.setDate(thisDate - thisDay)
        }
        return [start, end]
      },
    },

    {
      text: '上一週',
      value: () => {
        const oDate = new Date()
        oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7)

        var day = oDate.getDay()

        var start = new Date(),
          end = new Date()
        if (day == 0) {
          start.setDate(oDate.getDate())
          end.setDate(oDate.getDate() + 6)
        } else {
          start.setTime(oDate.getTime() - 3600 * 1000 * 24 * day)
          end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (6 - day))
        }

        return [start, end]
      },
    },

    {
      text: '這個月',
      value: () => {
        const end = new Date()
        const start = new Date().setDate(1)
        return [start, end]
      },
    },
    {
      text: '上個月',
      value: () => {
        const end = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        const start = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
        return [start, end]
      },
    },
    {
      text: '上季度',
      value: () => {
        var oDate = new Date()

        var thisYear = oDate.getFullYear()
        var thisMonth = oDate.getMonth() + 1

        var n = Math.ceil(thisMonth / 3) // 季度，上一个季度则-1
        var prevN = n - 1
        if (n == 1) {
          thisYear--
          prevN = 4
        }

        var Month = prevN * 3 // 月份

        var start = new Date(thisYear, Month - 3, 1)
        var end = new Date(thisYear, Month, 0)

        return [start, end]
      },
    },
  ],
})
const actions = {
  handleChange: (val) => {
    let start = null
    let end = null
    if (val?.length == 2) {
      if (typeof val[1] == 'string') {
        start = val[0]
        end = val[1]
      } else {
        start = !!val[0] ? dayjs(val[0]).format('YYYY-MM-DD') : null
        end = !!val[1] ? dayjs(val[1]).format('YYYY-MM-DD') : null
      }
    }

    emit('date-change', { start_date: start, end_date: end })
  },
}
</script>

<style>
.el-picker-panel__shortcut,
.el-picker-panel {
  color: #252525;
}
</style>

<style lang="scss" scoped>
.el-picker-panel__footer {
  button:nth-child(1) {
    display: none;
  }
}

.date-range-style::v-deep(.el-date-editor) {
  min-height: 2rem;
  border: 0;
  border-radius: 24px;
  background-color: var(--search-input-bg);
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  .el-range-input {
    background-color: transparent;
    color: #252525;
  }

  .el-range-separator {
    color: #252525;
  }
}

::v-deep(.el-range-editor.el-input__inner) {
  height: 32px;
}
</style>
