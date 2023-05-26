<template>
  <FormManage
    @on-submit="actions.handleSubmit"
    :disable="route.path.includes('1')"
    title="用戶權限">
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
            <!-- 用戶名稱 -->
            <el-col :span="24" :lg="12">
              <el-form-item label="用戶名稱" prop="name">
                <el-input
                  v-model="state.form.data.name"
                  placeholder="輸入用戶名稱"
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>

            <!-- 用戶角色 -->
            <el-col :span="24" :lg="12">
              <el-form-item
                label="用戶角色"
                prop="role"
                :error="state.form.errors?.roleId"
                class="custom-form-label">
                <el-select
                  v-model="state.form.data.roleId"
                  placeholder="請選擇用戶角色"
                  :disabled="!canEdit"
                  clearable
                  class="w-full">
                  <el-option
                    v-for="(item, index) in state.selectOptions?.roles"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <!-- 狀態 -->
            <el-col :span="12" :lg="4">
              <el-form-item
                label="啟用狀態"
                prop="status"
                :error="state.form.errors?.status"
                class="custom-input-bg-style">
                <div class="flex items-center gap-x-3">
                  <el-switch
                    v-model="state.form.data.status"
                    :disabled="!canEdit"
                    :active-value="true"
                    :inactive-value="false" />
                </div>
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
      creator: `${userStore.user?.name}-${userStore.user?.phone}`,
    },
    errors: <any>{},
    rules: <FormRules>{
      name: [{ required: true, message: '角色名稱為必填欄位', trigger: 'blur' }],
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
    api.userApi.fetch(id).then((result) => {
      if (result?.code === 200) {
        state.form.data = {
          ...result.data,
          roleId: result.data.UserRole[0].role?.id,
        }
      } else {
        mesBox.error({
          title: '無法取得用戶！',
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
      page: 1,
      take: 2000,
    }
    api.roleApi
      .fetchAll(params)
      .then((result) => {
        if (result?.code === 200) {
          state.selectOptions.roles = result.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  /**
   * @description 更新
   */
  handleEdit: (params: any) => {
    api.userApi
      .update(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '編輯用戶成功',
            })
            .then(() => {
              router.replace({
                path: '/user',
              })
            })
        } else {
          mesBox.error({
            title: '無法編輯用戶！',
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
      const params = {
        id: state.form.data.id,
        roleId: state.form.data.roleId,
        status: state.form.data.status,
      }
      if (isEditMode) {
        actions.handleEdit(params)
      }
    })
  },
}
</script>
