<template>
  <FormManage @on-submit="actions.handleSubmit">
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
            <el-col :span="12">
              <el-form-item label="用戶名稱" prop="displayName">
                <el-input
                  v-model="state.form.data.displayName"
                  placeholder="輸入用戶名稱"
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>

            <!-- 狀態 -->
            <el-col :span="12">
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

            <!-- 自動推播 -->
            <el-col :span="8">
              <el-form-item
                label="nike推播"
                prop="nike_broadcast"
                :error="state.form.errors?.nike_broadcast"
                class="custom-input-bg-style">
                <div class="flex items-center gap-x-3">
                  <el-switch
                    v-model="state.form.data.nike_broadcast"
                    :disabled="!canEdit"
                    :active-value="true"
                    :inactive-value="false" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="hypebeast推播"
                prop="hypebeast_broadcast"
                :error="state.form.errors?.hypebeast_broadcast"
                class="custom-input-bg-style">
                <div class="flex items-center gap-x-3">
                  <el-switch
                    v-model="state.form.data.hypebeast_broadcast"
                    :disabled="!canEdit"
                    :active-value="true"
                    :inactive-value="false" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="ithome推播"
                prop="ithome_broadcast"
                :error="state.form.errors?.ithome_broadcast"
                class="custom-input-bg-style">
                <div class="flex items-center gap-x-3">
                  <el-switch
                    v-model="state.form.data.ithome_broadcast"
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
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  dialogRadioTableVisible: false,
  form: {
    data: <any>{},
    errors: <any>{},
    rules: <FormRules>{
      name: [{ required: true, message: '角色名稱為必填欄位', trigger: 'blur' }],
    },
  },
})

const canEdit = computed(() => {
  return route.path.includes('create') || route.path.includes('edit')
})

onMounted(() => {
  actions.handleFetch()
})
const actions = {
  /**
   * @description 單筆
   */
  handleFetch: () => {
    const id = String(route.params.id)
    if (!id) return
    api.LineUserApi.fetch(id).then((result) => {
      if (result?.code === 200) {
        state.form.data = {
          ...result.data,
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
   * @description 更新
   */
  handleEdit: (params: any) => {
    api.LineUserApi.update(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '編輯用戶成功',
            })
            .then(() => {
              router.replace({
                path: '/lineUser',
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
        ...state.form.data,
      }
      if (isEditMode) {
        actions.handleEdit(params)
      }
    })
  },
}
</script>
