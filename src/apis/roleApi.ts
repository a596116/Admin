import { http } from '@/plugins/axios'

class roleApi {
  /**
   * @description: 獲取權限列表
   */
  fetchAll(query: any) {
    return http.request<IUser[]>({
      url: `user/role`,
      params: query,
    })
  }

  fetch(id: number) {
    return http.request<IRole>({
      url: `user/role/${id}`,
    })
  }

  /**
   * @description: 新增權限
   */
  create(data: any) {
    return http.request({
      url: `user/role/create`,
      method: 'post',
      data,
    })
  }


  update(data: any) {
    return http.request({
      url: `user/role/${data.id}`,
      method: 'put',
      data,
    })
  }


  delete(id: number) {
    return http.request({
      url: `user/role/${id}`,
      method: 'DELETE'
    })
  }

}

export default new roleApi()
