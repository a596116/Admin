<template>
  <section>
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
  </section>
</template>

<script setup lang="ts">
import type { ILoginUser, IRegisterUser } from '@/apis/authApi'
import type { FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()
const state = reactive({
  isSigin: route.path.includes('login') ? false : true, //false->login | true->regist
  // columns
  authLoginForm: [
    { title: '手機', name: 'phone', placeholder: '手機' },
    { title: '密碼', name: 'password', type: 'password', placeholder: '密碼' },
  ] as formColumnsType[],
  authRegisterForm: [
    { title: '暱稱', name: 'name', placeholder: '暱稱' },
    { title: '手機', name: 'phone', placeholder: '手機' },
    { title: '密碼', name: 'password', type: 'password', placeholder: '密碼' },
    { title: '驗證碼', name: 'captcha', placeholder: '驗證碼' },
  ] as formColumnsType[],
  // form
  loginForm:
    env.VITE_APP_TITLE == 'dev'
      ? {
          phone: '0988640301',
          password: '123456',
        }
      : ({
          phone: '0911111111',
          password: '123456',
        } as ILoginUser),
  regiserForm: {
    phone: '0988640301',
    password: '123456',
    name: 'haodai',
  } as IRegisterUser,
})

// ----------- Rules ----------
const loginRules = reactive<FormRules>({
  phone: [
    { required: true, message: '請輸入手機', trigger: 'blur' },
    { message: '手機長度10碼', trigger: 'blur', len: 10 },
  ],
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
  phone: [
    { required: true, message: '請輸入手機', trigger: 'blur' },
    { len: 10, message: '手機長度10碼', trigger: 'blur' },
  ],
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

const actions = {
  handleChange: (type: boolean) => {
    if (state.isSigin) {
      router.push({ name: 'login' })
    } else {
      router.push({ name: 'regist' })
    }
    state.isSigin = type
  },
}
</script>

<style scoped lang="scss">
section {
  @apply flex h-screen items-center justify-center overflow-hidden;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

  .color {
    position: absolute;
    filter: blur(150px);

    &:nth-child(1) {
      @apply top-[-300px] h-[600px] w-[60%];
      background: #c9dbb2;
    }

    &:nth-child(2) {
      @apply bottom-[50px] left-[100px] h-[400px] w-[70%];
      background: #e3f2c1;
    }

    &:nth-child(3) {
      @apply bottom-[200px] right-[200px] h-[300px] w-[50%];
      background: #f6ffde;
    }
  }

  .box {
    position: relative;
    .square {
      position: absolute;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
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
        background: rgba(255, 255, 255, 0.1);
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
</style>
