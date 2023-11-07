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
            <!-- 標題 -->
            <el-col :span="12">
              <el-form-item label="標題" prop="title" :error="state.form.errors.title">
                <el-input
                  v-model="state.form.data.title"
                  placeholder="輸入標題"
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>
            <!-- 描述 -->
            <el-col :span="12">
              <el-form-item label="描述" prop="descs" :error="state.form.errors.descs">
                <el-input
                  v-model="state.form.data.descs"
                  placeholder="輸入描述"
                  text-area
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>

            <!-- 圖片 -->
            <el-col :span="24">
              <el-form-item label="圖片連結" prop="img" :error="state.form.errors.img">
                <el-image :src="state.form.data.img" fit="cover" class="w-40" />
                <el-input
                  v-model="state.form.data.img"
                  placeholder="輸入圖片連結"
                  :disabled="!canEdit"
                  class="mt-2 custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>

            <!-- 連結 -->
            <el-col :span="24">
              <el-form-item label="連結" prop="link" :error="state.form.errors.link">
                <el-input
                  v-model="state.form.data.link"
                  placeholder="輸入連結"
                  :disabled="!canEdit"
                  class="custom-input-bg-style"></el-input>
              </el-form-item>
            </el-col>

            <!-- 發售日期 -->
            <el-col :span="12">
              <el-form-item label="發售日期" prop="time" :error="state.form.errors.time">
                <PickerDate v-model:date="state.form.data.time" />
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
  form: {
    data: <any>{},
    errors: <any>{},
    rules: <FormRules>{
      title: [{ required: true, message: '標題為必填欄位', trigger: 'blur' }],
      descs: [{ required: true, message: '描述為必填欄位', trigger: 'blur' }],
      img: [{ required: true, message: '圖片連結為必填欄位', trigger: 'blur' }],
      link: [{ required: true, message: '連結為必填欄位', trigger: 'blur' }],
      time: [{ required: true, message: '發售日期為必填欄位', trigger: 'blur' }],
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
    api.hypebeastApi.fetch(id).then((result) => {
      if (result?.code === 200) {
        state.form.data = {
          ...result.data,
        }
      } else {
        mesBox.error({
          title: '無法取得hypebeast！',
          subTitle: result?.message,
        })
      }
    })
  },

  /**
   * @description 更新
   */
  handleEdit: (params: any) => {
    api.hypebeastApi
      .update(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '編輯hypebeast成功',
            })
            .then(() => {
              router.replace({
                path: '/hypebeast',
              })
            })
        } else {
          mesBox.error({
            title: '無法編輯hypebeast！',
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
