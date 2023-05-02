import authApi, { type ILoginUser, type IRegisterUser } from '@/apis/authApi'
import { defineStore } from 'pinia'
import { permissionList } from '@/router/autoImport'
import router from '@/router'
import { CacheEnum } from '@/enum/cacheEnum'
import { ElMessage } from 'element-plus'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | IUser>(null)

  /**
   * @description: 獲取用戶資訊 
   */
  const getUser = async () => {
    return new Promise(async (resolve) => {
      await authApi.info()
        .then((res) => {
          if (res.code == 20000) {
            user.value = res.data
            resolve(res)
          } else {
            console.log('未獲取到用戶資訊')
            storage.removeAll()
            resolve(res)
          }
        })
        .catch(() => {
          storage.removeAll()
          resolve(null)
        })
    })
  }

  /**
   * @description: 添加需權限的路由
   */
  const permissionlist = async () => {
    await getUser()
    permissionList.forEach((r) => {
      if (user.value?.permissions?.includes(r.meta?.permission!)) {
        router.addRoute(r.meta!.page!.name, r)
      }
    })
  }

  const login = async (loginForm: ILoginUser) => {
    const auth = {
      phone: loginForm.phone,
      password: loginForm.password
    }
    await authApi.login(auth)
      .then(async (res) => {
        if (res.code == 20000) {
          storage.set(CacheEnum.TOKEN_NAME, res.data.token)
          storage.set(CacheEnum.USER_NAME, res.data.userPhone)
          const routeName = storage.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
          await permissionlist()
          if (user.value?.active === '1') { //檢查用戶狀態
            router.push({ name: routeName })
            ElMessage.success(`歡迎${user.value?.name}`)
          } else {
            storage.remove(CacheEnum.TOKEN_NAME, CacheEnum.USER_NAME)
            ElMessage.error('您以被停權，請聯繫管理員')
          }
        } else {
          ElMessage.error('手機或密碼錯誤')
        }
      })
      .catch((err) => {
        ElMessage.error(`登入發生錯誤，詳情-${err}`)
        console.error(err)
      })
  }

  const registUser = async (userForm: IRegisterUser) => {
    await authApi.regist(userForm)
      .then(res => {
        if (res.code == 20000) {
          login(userForm)
        }
      })
  }

  const logout = () => {
    permissionList.forEach((r) => {
      if (router.hasRoute(r.name!)) router.removeRoute(r.name!)
    })
    router.push('/login')
    storage.removeAll()
    user.value = null
    ElMessage.success('退出登入')
  }


  return { user, getUser, login, registUser, logout }
}, { persist: true })
