import { http } from '@/plugins/axios'

export interface LineUser {
  id: string
  displayName: string
  pictureUrl: string
  status: boolean
  callback: string
  url: string
  type: string
  nike_broadcast: boolean
  hypebeast_broadcast: boolean
  ithome_broadcast: boolean
  created_at: string
  updated_at: string
}

enum Api {
  default = 'line',
}

class LineUserApi {
  /**
   * @description: 獲取Line用戶列表
   */
  fetchAll(query: any) {
    return http.request<LineUser[]>({
      url: `${Api.default}`,
      params: query,
    })
  }

  /**
   * @description: 獲取Line用戶
   */
  fetch(id: string) {
    return http.request<IUser>({
      url: `${Api.default}/${id}`,
    })
  }

  /**
   * @description: 新增Line用戶
   */
  create(data: any) {
    return http.request({
      url: `${Api.default}`,
      method: 'post',
      data,
    })
  }

  /**
   * @description: 更新Line用戶
   */
  update(data: any) {
    return http.request({
      url: `${Api.default}/${data.id}`,
      method: 'put',
      data,
    })
  }

  /**
   * @description: 刪除Line用戶
   */
  delete(id: number) {
    return http.request({
      url: `${Api.default}/${id}`,
      method: 'DELETE',
    })
  }
}

export default new LineUserApi()
