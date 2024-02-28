import { http } from '@/plugins/axios'
enum Api {
  default = 'user/permission',
}
class permissionApi {
  /**
   * @description: 獲取權限列表
   */
  fetchAll(query: any) {
    return http.request<IUser[]>({
      url: `${Api.default}`,
      params: query,
    })
  }

  fetch(id: number) {
    return http.request<IRole>({
      url: `${Api.default}/${id}`,
    })
  }

  /**
   * @description: 新增權限
   */
  create(data: any) {
    return http.request({
      url: `${Api.default}`,
      method: 'post',
      data,
    })
  }

  update(data: any) {
    return http.request({
      url: `${Api.default}/${data.id}`,
      method: 'put',
      data,
    })
  }

  delete(id: number) {
    return http.request({
      url: `${Api.default}/${id}`,
      method: 'DELETE',
    })
  }
}

export default new permissionApi()
