import { http } from '@/plugins/axios'

export interface IRegisterUser {
  name: string
  phone: string
  password: string
  token?: string
}
export interface ILoginUser {
  phone: string
  password: string
}

export interface IAlterUser {
  id: string
  name: string
  phone: string
  password: string
  avatar: string
}

export interface IAlterUserPassword {
  phone: string
  password: string
  newPassword: string
}
enum Api {
  default = 'auth',
  login = 'auth/login',
  register = 'auth/register',
  alter = 'auth/alter',
  alterPassword = 'auth/alterPassword',
  captcha = 'auth/captcha',
  info = 'auth/info',
}

class authApi {
  // 用戶資訊
  info(userId: number) {
    return http.request<IUser>({
      url: `${Api.default}/${userId ?? 0}`,
    })
  }
  /**
   * 用戶登入
   */
  login(loginForm: ILoginUser) {
    return http.request<any>({
      url: `${Api.login}`,
      method: 'POST',
      data: loginForm,
    })
  }

  /**
   * 用戶註冊
   */
  regist(userForm: IRegisterUser) {
    return http.request({
      url: `${Api.register}`,
      method: 'post',
      data: { ...userForm, status: true, avatar: '0', gender: 'other', birthday: '2000-01-01' },
    })
  }

  /**
   * 修改用戶資訊
   * @date 2022-08-30
   */
  alterUserInfo(user: IAlterUser) {
    return http.request({
      url: `${Api.alter}`,
      method: 'POST',
      data: user,
    })
  }

  /**
   * 修改用戶密碼
   * @date 2022-08-30
   */
  alterUserPassword(user: IAlterUserPassword) {
    return http.request({
      url: `${Api.alterPassword}`,
      method: 'POST',
      data: user,
    })
  }

  getUser(id: string) {
    return http.request<IUser>({
      url: `${Api.default}/${id}`,
    })
  }

  /**
   * 獲取註冊驗證碼
   */
  captcha(id?: string) {
    return http.request({
      url: `${Api.captcha}/${id ? id : '-1'}`,
    })
  }

  verify(captcha: { captcha: string; id: string }) {
    return http.request({
      method: 'POST',
      url: `${Api.captcha}`,
      data: captcha,
    })
  }

  update(data: any) {
    return http.request({
      url: `${Api.info}/${data.id}`,
      method: 'put',
      data,
    })
  }
}

export default new authApi()
