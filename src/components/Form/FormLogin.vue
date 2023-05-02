<template>
  <div>
    <el-form ref="FormRef" :model="model" :rules="rules" class="form">
      <h1>{{ title }}</h1>
      <el-form-item v-for="f of fields" :key="f.name" :prop="f.name">
        <el-input
          v-if="f.name !== 'captcha'"
          v-model.trim="model[f.name]"
          :placeholder="f.placeholder"
          clearable
          :show-password="f.type == 'password'"
          :type="f.type"
          @keyup.enter="submitForm(FormRef)"
          class="mt-[20px]" />
        <div v-else class="flex items-center justify-center w-full">
          <el-input
            v-model.trim="model[f.name]"
            :placeholder="f.placeholder"
            clearable
            maxlength="4"
            @keyup.enter="submitForm(FormRef)"
            class="!w-1/2" />
          <div v-html="captcha.img" @click="getNewCaptcha(captcha.id)" class="w-1/2"></div>
        </div>
      </el-form-item>
      <slot name="button"></slot>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(FormRef)"
          class="relative mx-auto mt-[40px] rounded-[20px] px-[50px] py-[8px] font-black">
          {{ type == 'login' ? '登入' : '註冊' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'
import authApi from '@/apis/authApi'

const props = defineProps<{
  fields: formColumnsType[]
  model: any
  title: string
  type: string
  rules: any
}>()

const captcha = ref<any>({ id: '-1', img: '' })
onMounted(() => {
  getNewCaptcha()
})

/**
 * 獲取驗證碼
 * @date 2022-08-28
 */
const getNewCaptcha = (id?: string) => {
  props.model.captcha = ''
  authApi.captcha(id).then((res) => {
    captcha.value = res.data
  })
}

const FormRef = ref<FormInstance>()

const authStore = useAuthStore()
/**
 * 提交表單
 * @date 2022-08-28
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (props.type == 'login') {
    await formEl?.validate((valid: boolean) => {
      if (valid) {
        authStore.login(props.model).then(() => {})
      }
    })
  } else if (props.type == 'register') {
    await formEl?.validate((valid: boolean) => {
      if (valid) {
        const cap = {
          captcha: props.model.captcha,
          id: captcha.value.id,
        }
        authApi.verify(cap).then((res) => {
          if (res.code === 20000) {
            authStore.registUser(props.model).then(() => {})
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">
:deep(.el-form) {
  @apply relative h-full w-[100%] px-[30px] py-[40px] md:w-[340px];

  h1 {
    @apply relative mb-[40px] text-[24px] font-semibold text-hd-Text;
    letter-spacing: 1px;

    &::before {
      @apply absolute bottom-[-10px] left-0 h-[4px] w-[80px] bg-hd-Color content-[''];
    }
  }
  .el-form-item.is-error .el-input {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
  .el-input {
    @apply w-full rounded-[35px] border-0 px-[20px] py-[10px] text-base outline-none;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    ::placeholder {
      color: #3c486b !important;
    }
    :deep(.el-input__suffix-inner) {
      @apply text-green-500;
    }
  }
}
</style>
