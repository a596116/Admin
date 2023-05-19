<template>
  <FormManage @on-submit="actions.handleSubmit" title="用戶權限">
    <template #form>
      <el-form
        ref="ruleFormRef"
        :rules="state.form.rules"
        :model="state.form.data"
        label-width="auto"
        label-position="top"
        size="small"
        class="custom-form"
        scroll-to-error>
        <div>
          <el-row :gutter="24">
            <el-col :span="24">
              <DefaultTable
                v-model:table-data="state.form.data.lists"
                :columns="state.permissions_columns"
                :show-selection="false"
                :show-header="false"
                :show-footer="false"
                :show-action-col="canEdit"
                :action-buttons="[]"
                :sortable="false"
                :table-height="'auto'">
                <!-- 權限名稱 -->
                <template #name="scope">
                  <el-input
                    v-model="scope.row.name"
                    :disabled="!canEdit"
                    class="custom-input-bg-style"></el-input>
                </template>
                <!-- 備註 -->
                <template #remark="scope">
                  <el-input v-model="scope.row.remark" class="custom-input-bg-style"></el-input>
                </template>
                <!-- 創建者 -->
                <template #creator="scope">
                  <el-input
                    v-model="scope.row.creator"
                    disabled
                    class="custom-input-bg-style"></el-input>
                </template>
                <!-- 操作 -->
                <template #action="scope" v-if="canEdit">
                  <el-button
                    :icon="Minus"
                    circle
                    @click="
                      actions.handleDeletePermission(scope.row, scope.index, 'paying')
                    "></el-button>
                  <el-button
                    :class="{
                      invisible: !actions.handleShowPlus(scope.index),
                    }"
                    :icon="Plus"
                    circle
                    type="primary"
                    @click="actions.handleAddPermission"></el-button>
                </template>
              </DefaultTable>
              <el-divider />
            </el-col>
          </el-row>
        </div>
      </el-form>
    </template>
  </FormManage>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Plus, Minus } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/authStore'
import { isEmpty, last } from 'lodash-es'
import { useListEmptyCheck } from '@/utils/useListEmptyCheck'
const router = useRouter()
const route = useRoute()
const userStore = useAuthStore()
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  dialogRadioTableVisible: false,
  form: {
    data: <any>{
      lists: { data: [{ creator: `${userStore.user?.name}-${userStore.user?.phone}` }] },
    },
    errors: <any>{},
    rules: <FormRules>{
      name: [{ required: true, message: '權限名稱為必填欄位', trigger: 'blur' }],
    },
  },
  permissions_columns: [
    { label: '權限名稱', prop: 'name', formatter: true },
    { label: '備註', prop: 'remark', formatter: true },
    { label: '創建者', prop: 'creator', formatter: true },
  ],
  dialogResultVisible: false,
})

const canEdit = computed(() => {
  return route.path.includes('create')
})

onMounted(() => {
  actions.handleFetch()
})
const actions = {
  /**
   * @description 單筆
   */
  handleFetch: () => {
    const id = Number(route.params.id)
    if (!id) return
    api.permissionApi.fetch(id).then((result) => {
      if (result?.code === 200) {
        state.form.data.id = result?.data?.id
        state.form.data.lists.data[0].name = result?.data?.name
        state.form.data.lists.data[0].remark = result?.data?.remark
      } else {
        mesBox.error({
          title: '無法取得角色權限！',
          subTitle: result?.message,
        })
      }
    })
  },

  /**
   * @description 新增
   */
  handleCreate: (params: any) => {
    const data = {
      permissions: params.lists.data,
    }
    api.permissionApi
      .create(data)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '新增角色權限成功',
            })
            .then(() => {
              router.replace({
                path: '/permission',
              })
            })
        } else {
          mesBox.error({
            title: '無法新增角色權限！',
            subTitle: result?.message,
          })
        }
      })
      .catch((error) => {
        actions.handleCatchError(error)
      })
  },

  /**
   * @description 更新
   */
  handleEdit: (params: any) => {
    api.permissionApi
      .update(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '編輯角色權限成功',
            })
            .then(() => {
              router.replace({
                path: '/permission',
              })
            })
        } else {
          mesBox.error({
            title: '無法編輯角色權限！',
            subTitle: result?.message,
          })
        }
      })
      .catch((error) => {
        actions.handleCatchError(error)
      })
  },
  /**
   * @description 422 錯誤提示
   */
  handleCatchError: (error: any) => {
    const errors = error?.response?.data?.errors
    state.form.errors = {}
    nextTick(() => {
      if (error?.response?.status !== 422) return
      Object.entries(errors).forEach(([key, val]: any) => (state.form.errors[key] = val.join(' ')))
    })
  },
  /**
   * @description 新增/修改
   */
  handleSubmit: () => {
    ruleFormRef.value?.validate((valid) => {
      if (!valid) return
      const isEditMode = !!route.params.id
      const params = state.form.data
      if (isEditMode) {
        actions.handleEdit(params)
      } else {
        actions.handleCreate(params)
      }
    })
  },

  /*
   * @description: 刪除單筆權限
   */
  handleDeletePermission: (row: any, index: number, type: string) => {
    state.form.data.lists.data.splice(index, 1)
    if (isEmpty(state.form.data.lists.data)) {
      state.form.data.lists.data = [{ creator: `${userStore.user?.name}-${userStore.user?.phone}` }]
    }
  },

  /*
   * @description: 顯示新增權限按鈕
   */
  handleShowPlus: (index: number) => {
    return state.form.data.lists.data.length == index + 1
  },

  /*
   * @description: 檢查權限名稱是否為空
   */
  handleCheckList: (lists: any) => {
    if (!useListEmptyCheck(lists, 'name')) {
      ElMessage('請填寫權限名稱!')
      return
    }
    return true
  },

  /*
   * @description: 新增一條權限
   */
  handleAddPermission: () => {
    const isChecked = actions.handleCheckList([last(state.form.data.lists.data)])
    if (!isChecked) return
    state.form.data.lists.data.push({
      creator: `${userStore.user?.name}-${userStore.user?.phone}`,
    })
  },
}
</script>
