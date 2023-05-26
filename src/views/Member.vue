<template>
  <main class="flex h-full p-6">
    <UploadImage
      v-model:list="state.form.data.avatar"
      :max="1"
      class="w-[200px] h-[200px] m-6"
      :show-alt="false"
      :cropper="true"
      @on-change="actions.handleAvatarUpdate" />
    <FormManage @on-submit="actions.handleSubmit" :is-single-page="true" :show-header="false">
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
              <!-- 用戶姓名 -->
              <el-col :span="24" :lg="24">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="state.form.data.name"
                    placeholder="輸入姓名"
                    class="custom-input-bg-style"></el-input>
                </el-form-item>
              </el-col>

              <!-- 用戶生日 -->
              <el-col :span="24" :lg="16">
                <el-form-item label="生日" prop="birthday">
                  <PickerDate v-model:date="state.form.data.birthday" />
                </el-form-item>
              </el-col>

              <!-- 用戶性別 -->
              <el-col :span="24" :lg="16">
                <el-form-item label="性別" prop="gender">
                  <el-radio-group v-model="state.form.data.gender">
                    <el-radio label="M" size="large">男</el-radio>
                    <el-radio label="F" size="large">女</el-radio>
                    <el-radio label="other" size="large">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </template>
    </FormManage>
  </main>
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
      avatar: [],
    },
    errors: <any>{},
    rules: <FormRules>{
      name: [{ required: true, message: '角色名稱為必填欄位', trigger: 'blur' }],
    },
  },
})

onMounted(() => {
  actions.handleFetch()
})

const actions = {
  /**
   * @description 單筆
   */
  handleFetch: () => {
    const id = userStore.user.id
    if (!id) return
    api.userApi.fetch(id).then((result) => {
      if (result?.code === 200) {
        state.form.data = {
          ...result.data,
          avatar: result.data.avatar !== '0' ? [{ img: result.data.avatar }] : [],
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
    api.authApi
      .update(params)
      .then((result) => {
        if (result?.code === 200) {
          mesBox
            .success({
              title: '更新成功',
            })
            .then(() => {
              router.go(0)
            })
        } else {
          mesBox.error({
            title: '無法編輯！',
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
      const params = {
        id: state.form.data.id,
        name: state.form.data.name,
        birthday: state.form.data.birthday,
        gender: state.form.data.gender,
        avatar: state.form.data.avatar[0]?.img || '',
      }
      actions.handleEdit(params)
    })
  },

  handleAvatarUpdate: (list: any) => {
    state.form.data.avatar = list
  },
}
</script>

<style scoped lang="scss"></style>
