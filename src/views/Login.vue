<template>
  <main>
    <div class="introduce">
      <div class="introduce-content">
        <p class="tips animate__animated animate__slideInLeft">歡迎使用後台管理系統</p>
      </div>
    </div>
    <div class="form-wrapper animate__animated animate__slideInRight">
      <TransitionGroup
        leave-active-class="animate__animated animate__backOutRight"
        enter-active-class="animate__animated animate__backInRight animate__delay-0.7s">
        <FormLogin
          v-if="!state.isSigin"
          title="登入"
          :fields="state.authLoginForm"
          :model="state.loginForm"
          :rules="loginRules"
          class="absolute w-full px-[10%]"
          @submit="actions.handleLogin"
          type="login">
          <template #button>
            <div class="flex items-center justify-between gap-4 mt-8">
              <el-checkbox
                v-model="state.loginForm.rememberMe"
                label="記住我"
                class="text-hd-white" />
              <Anchor text="註冊帳號" @click="actions.handleChange(true)" />
            </div>
          </template>
        </FormLogin>
        <FormLogin
          v-else
          ref="registeFrom"
          title="用戶註冊"
          :fields="state.authRegisterForm"
          :model="state.regiserForm"
          :rules="registRules"
          class="absolute w-full px-[10%]"
          @submit="actions.handleRegister"
          type="register">
          <template #button>
            <div class="flex items-center justify-end gap-4 mt-5">
              <!-- <Anchor text="找回密碼" to="/" />
              <span class="text-base">|</span> -->
              <Anchor text="帳號登入" @click="actions.handleChange(false)" />
            </div>
          </template>
        </FormLogin>
      </TransitionGroup>
    </div>
  </main>
  <!-- <section>
    <div class="color" v-for="i in 3"></div>
    <div class="box">
      <div class="square" style="--i: 0"></div>
      <div class="square" style="--i: 1"></div>
      <div class="square" style="--i: 2"></div>
      <div class="square" style="--i: 3"></div>
      <div class="square" style="--i: 4"></div>
      <div class="form-container">
        <div class="container" :class="{ sigin: state.isSigin }">
          <FormLogin
            title="用戶登入"
            :fields="state.authLoginForm"
            :model="state.loginForm"
            :rules="loginRules"
            type="login">
            <template #button>
              <div class="flex items-center justify-end gap-4 mt-5">
                <Anchor text="會員註冊" @click="actions.handleChange(true)" />
              </div>
            </template>
          </FormLogin>
        </div>

        <div class="container" :class="{ sigin: state.isSigin }">
          <FormLogin
            title="用戶註冊"
            :fields="state.authRegisterForm"
            :model="state.regiserForm"
            :rules="registRules"
            type="register">
            <template #button>
              <div class="flex items-center justify-end gap-4 mt-5">
                <Anchor text="找回密碼" to="/" />
                <span class="text-base">|</span>
                <Anchor text="帳號登入" @click="actions.handleChange(false)" />
              </div>
            </template>
          </FormLogin>
        </div>
      </div>
    </div>
  </section> -->
</template>

<script setup lang="ts">
import type { ILoginUser, IRegisterUser } from '@/apis/authApi'
import { useAuthStore } from '@/stores/authStore'
import { useCookies } from 'vue3-cookies'
import CryptoJS from 'crypto-js'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { cookies } = useCookies()
const registeFrom = ref()

const state = reactive({
  isSigin: route.path.includes('login') ? false : true, //false->login | true->regist
  // columns
  authLoginForm: [
    { title: '帳號', name: 'account', placeholder: '請輸入帳號', icon: 'user' },
    { title: '密碼', name: 'password', type: 'password', placeholder: '密碼', icon: 'password' },
  ] as formColumnsType[],
  authRegisterForm: [
    { title: '暱稱', name: 'name', placeholder: '暱稱' },
    { title: '帳號', name: 'account', placeholder: '帳號' },
    { title: '密碼', name: 'password', type: 'password', placeholder: '密碼' },
    { title: '驗證碼', name: 'captcha', placeholder: '驗證碼' },
  ] as formColumnsType[],
  // form
  loginForm:
    env.VITE_APP_TITLE == 'dev'
      ? {
          account: '0988640301',
          password: '123456',
          rememberMe: false,
        }
      : ({
          account: '0911111111',
          password: '123456',
          rememberMe: false,
        } as ILoginUser),
  regiserForm: {
    account: '',
    password: '',
    name: '',
    captcha: '',
  } as IRegisterUser,
})

// ----------- Rules ----------
const loginRules = reactive<FormRules>({
  account: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blur' },
    { min: 2, max: 12, message: '名稱在2到12個字', trigger: 'blur' },
  ],
})
const registRules = reactive<FormRules>({
  account: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 12, message: '密碼長度在 5 到 12 之間', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blur' },
    { min: 2, max: 12, message: '名稱在2到12個字', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '請輸入驗證碼', trigger: 'blur' },
    { min: 4, max: 4, message: '請輸入4位驗證碼', trigger: 'blur' },
  ],
})

onMounted(() => {
  getCookie()
})

const getCookie = () => {
  const storeAccount = cookies.get('account')
  const storePassword = cookies.get('password')
  const storeRememberMe = cookies.get('rememberMe')
  const { account, password, rememberMe } = state.loginForm

  let decryptedPassword = ''
  if (storePassword) {
    const decrypted = CryptoJS.AES.decrypt(storePassword, 'haodai')
    decryptedPassword = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted))
  }
  state.loginForm = {
    account: storeAccount ? storeAccount : account,
    password: decryptedPassword ? decryptedPassword : password,
    rememberMe: storeRememberMe ? Boolean(storeRememberMe) : rememberMe,
  }
}
const setCookie = (account: string, password: string, rememberMe: any) => {
  if (rememberMe) {
    const encryptPassword = CryptoJS.AES.encrypt(JSON.stringify(password), 'haodai').toString()
    cookies.set('account', account, 30)
    cookies.set('password', encryptPassword, 30)
    cookies.set('rememberMe', rememberMe, 30)
  } else {
    cookies.remove('account')
    cookies.remove('password')
    cookies.remove('rememberMe')
  }
}

const actions = {
  handleChange: (type: boolean) => {
    if (state.isSigin) {
      router.push({ name: 'login' })
    } else {
      router.push({ name: 'regist' })
    }
    state.isSigin = type
  },

  /**
   * 登入
   */
  handleLogin: async (formEl: FormInstance | undefined) => {
    const { rememberMe, account, password } = state.loginForm
    await formEl?.validate((valid: boolean) => {
      if (valid) {
        authStore.login(state.loginForm).then(() => {
          setCookie(account, password, rememberMe)
          router.push('/')
        })
      }
    })
  },

  /**
   * 註冊
   */
  handleRegister: async (formEl: FormInstance | undefined) => {
    const { token } = state.regiserForm
    await formEl?.validate((valid: boolean) => {
      if (valid) {
        const cap = {
          captcha: state.regiserForm.captcha,
          id: registeFrom.value?.captcha.id,
        }
        api.authApi.verify(cap).then((res) => {
          if (res.code === 200) {
            authStore.registUser(state.regiserForm).then(() => {})
          }
        })
      }
    })
  },
}
</script>

<style scoped lang="scss">
main {
  @apply relative flex h-screen w-screen overflow-hidden text-white;
  background-image: url('@/assets/img/loginBg.png');
  background-attachment: fixed;
  background-size: cover;
}
.introduce {
  @apply relative h-full w-1/2 max-md:hidden;
  .introduce-content {
    .tips {
      @apply absolute left-[20%] top-[40%] my-5 -translate-y-1/2 text-2xl;
    }
  }
}
.form-wrapper {
  @apply absolute right-0 box-border flex h-full w-1/2 items-center justify-center  max-md:w-full;
  background: rgb(0 0 0 / 6%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}
</style>

<!-- <style scoped lang="scss">
section {
  @apply flex h-screen items-center justify-center overflow-hidden;
  // background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
  background: url('@/assets/img/loginBg.png');

  // .color {
  //   position: absolute;
  //   filter: blur(150px);

  //   &:nth-child(1) {
  //     @apply top-[-300px] h-[600px] w-[60%];
  //     background: #c9dbb2;
  //   }

  //   &:nth-child(2) {
  //     @apply bottom-[50px] left-[100px] h-[400px] w-[70%];
  //     background: #e3f2c1;
  //   }

  //   &:nth-child(3) {
  //     @apply bottom-[200px] right-[200px] h-[300px] w-[50%];
  //     background: #f6ffde;
  //   }
  // }

  .box {
    position: relative;

    .square {
      position: absolute;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.6);
      border-radius: 10px;
      animation: animate 10s linear infinite;
      animation-delay: calc(-1s * var(--i));

      &:nth-child(1) {
        @apply right-[-60px] top-[-50x] h-[100px] w-[100px];
      }

      &:nth-child(2) {
        @apply left-[-100px] top-[150px] z-[2] h-[120px] w-[120px];
      }

      &:nth-child(3) {
        @apply bottom-[50px] right-[-60px] z-[2] h-[80px] w-[80px];
      }

      &:nth-child(4) {
        @apply left-[80px] top-[450px] h-[50px] w-[50px];
      }

      &:nth-child(5) {
        @apply left-[140px] top-[-80px] h-[60px] w-[60px];
      }
    }
    .form-container {
      perspective: 900px;
      position: relative;

      .container {
        @apply relative flex min-h-[400px] w-[100%] items-center justify-center rounded-[10px] md:w-[400px];
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1p x solid rgba(255, 255, 255, 0.2);
        transform-style: preserve-3d;
        backface-visibility: hidden;
        visibility: visible;
        transform: rotateY(0deg);
        transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);

        &.sigin {
          transform: rotateY(-180deg);
        }

        &:nth-child(2) {
          position: absolute;
          top: -100px;
          left: 0;
          width: 100%;
          transform: rotateY(180deg);

          &.sigin {
            transform: rotateY(0deg);
          }
        }
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-40px);
  }

  50% {
    transform: translateY(40px);
  }
}
</style> -->
