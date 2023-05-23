import { http } from '@/plugins/axios'

class userApi {
  /**
   * @description: 獲取用戶列表
   */
  fetchAll(query: any) {
    return http.request<IUser[]>({
      url: `auth`,
      params: query,
    })
  }

  fetch(id: number) {
    return http.request<IUser>({
      url: `auth/${id}`,
    })
  }


  update(data: any) {
    return http.request({
      url: `auth/${data.id}`,
      method: 'put',
      data,
    })
  }
}

export default new userApi()
