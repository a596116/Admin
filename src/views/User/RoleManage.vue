<template>
  <FormManage @on-submit="actions.handleSubmit" :disable="route.path.includes('1')">
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
            <!-- 權限名稱 -->
            <el-col :span="24" :lg="12">
              <el-form-item label="權限名稱" prop="name">
                <el-input
                  v-model="state.form.data.name"
                  placeholder="輸入權限名稱"
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>

            <!-- 權限功能 -->
            <el-col :span="24" :lg="12">
              <el-form-item prop="role" :error="state.form.errors?.role" class="custom-form-label">
                <template #label>
                  <div class="flex items-baseline gap-x-1">
                    <p>權限功能</p>
                  </div>
                </template>
                <CascaderNestMutiple
                  v-model="state.form.data.role"
                  :options="state.selectOptions?.permissions"
                  children="children"
                  :disabled="!canEdit"
                  :show-all-levels="false"
                  :placeholder="canEdit ? '請選擇權限功能' : '尚未選擇'"
                  @on-change="actions.handleCascaderNest" />
              </el-form-item>
            </el-col>
            <!-- 備註 -->
            <el-col :span="24">
              <el-form-item label="備註" prop="remark">
                <el-input
                  v-model="state.form.data.remark"
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </template>
  </FormManage>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useAuthStore()
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  dialogRadioTableVisible: false,
  form: {
    data: <any>{
      creator: `${userStore.user?.name}-${userStore.user?.account}`,
    },
    errors: <any>{},
    rules: <FormRules>{
      name: [{ required: true, message: '權限名稱為必填欄位', trigger: 'blur' }],
    },
  },
  selectOptions: <any>{},
})

const canEdit = computed(() => {
  return route.path.includes('create') || route.path.includes('edit')
})

onMounted(() => {
  actions.handleFetch()
  actions.handleFetchAllSelectOptions()
})
const actions = {
  /**
   * @description 單筆
   */
  handleFetch: () => {
    const id = Number(route.params.id)
    if (!id) return
    api.roleApi.fetch(id).then((result) => {
      if (result?.code === 200) {
        state.form.data = result?.data
      } else {
        mesBox.error({
          title: '無法取得用戶權限！',
          subTitle: result?.message,
        })
      }
    })
  },

  /**
   * @description 取得下拉選項
   */
  handleFetchAllSelectOptions: async () => {
    const params = {
      current_page: 1,
      take: 2000,
    }
    api.permissionApi
      .fetchAll(params)
      .then((result) => {
        if (result?.code === 200) {
          state.selectOptions.permissions = result.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  /**
   * @description 階層
   */
  handleCascaderNest: (res: any) => {
    if (!res) return
    state.form.data.role = res
  },

  /**
   * @description 新增
   */
  handleCreate: (params: any) => {
    api.roleApi
      .create(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '新增用戶權限成功',
            })
            .then(() => {
              router.replace({
                path: '/role',
              })
            })
        } else {
          mesBox.error({
            title: '無法新增用戶權限！',
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
    api.roleApi
      .update(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '編輯用戶權限成功',
            })
            .then(() => {
              router.replace({
                path: '/role',
              })
            })
        } else {
          mesBox.error({
            title: '無法編輯用戶權限！',
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
}
</script>
