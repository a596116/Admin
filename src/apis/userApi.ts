import { http } from '@/plugins/axios'
enum Api {
  default = 'auth',
}
class userApi {
  /**
   * @description: 獲取用戶列表
   */
  fetchAll(query: any) {
    return http.request<IUser[]>({
      url: `${Api.default}`,
      params: query,
    })
  }

  fetch(id: number) {
    return http.request<IUser>({
      url: `${Api.default}/${id}`,
    })
  }

  update(data: any) {
    return http.request({
      url: `${Api.default}/${data.id}`,
      method: 'put',
      data,
    })
  }
}

export default new userApi()
