import { http } from '@/plugins/axios'

class permissionApi {
  /**
   * @description: 獲取權限列表
   */
  fetchAll(query: any) {
    return http.request<IUser[]>({
      url: `user/permission`,
      params: query,
    })
  }

  fetch(id: number) {
    return http.request<IRole>({
      url: `user/permission/${id}`,
    })
  }

  /**
   * @description: 新增權限
   */
  create(data: any) {
    return http.request({
      url: `user/permission/create`,
      method: 'post',
      data,
    })
  }


  update(data: any) {
    return http.request({
      url: `user/permission/${data.id}`,
      method: 'put',
      data,
    })
  }


  delete(id: number) {
    return http.request({
      url: `user/permission/${id}`,
      method: 'DELETE'
    })
  }

}

export default new permissionApi()
