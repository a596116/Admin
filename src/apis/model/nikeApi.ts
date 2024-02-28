import { http } from '@/plugins/axios'

export interface Nike {
  id: number
  title: string
  descs: any
  img: string
  link: string
  time: string
  created_at: string
  updated_at: string
}

enum Api {
  default = 'nike',
}

class NikeApi {
  /**
   * @description: 獲取Nike列表
   */
  fetchAll(query: any) {
    return http.request<Nike[]>({
      url: `${Api.default}`,
      params: query,
    })
  }

  /**
   * @description: 獲取Nike
   */
  fetch(id: string) {
    return http.request<Nike>({
      url: `${Api.default}/${id}`,
    })
  }

  /**
   * @description: 新增Nike
   */
  create(data: any) {
    return http.request({
      url: `${Api.default}`,
      method: 'post',
      data,
    })
  }

  /**
   * @description: 更新Nike
   */
  update(data: any) {
    return http.request({
      url: `${Api.default}/${data.id}`,
      method: 'put',
      data,
    })
  }

  /**
   * @description: 刪除Nike
   */
  delete(id: number) {
    return http.request({
      url: `${Api.default}/${id}`,
      method: 'DELETE',
    })
  }
}

export default new NikeApi()
